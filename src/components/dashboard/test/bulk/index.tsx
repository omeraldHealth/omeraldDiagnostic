//@ts-nocheck
import React, { useState } from 'react';
import { Modal, Button, Upload, message, Alert } from 'antd';
import { InboxOutlined, DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useDCProfileValue } from '@/utils/recoil/values';
import { usePersistedDCState } from '@/hooks/localstorage';
import { useInvalidateQuery } from '@/utils/query/getQueries';
import { errorAlert, successAlert } from '@/components/common/alerts';
import { bulkDiagTestApi } from '@/utils/api';
import { useUpdateDiagnostic } from '@/utils/query/updateQueries';

const { Dragger } = Upload;

const BulkUploadModal = ({ visible, onClose }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDc] = usePersistedDCState();
  const updateDc = useUpdateDiagnostic({});
  const profileData = useDCProfileValue();
  const invalidateQuery = useInvalidateQuery();

  const props = {
    name: 'file',
    multiple: false,
    beforeUpload: (newFile: any) => {
      if (file) {
        message.error('Only one file can be uploaded at a time.');
        return false;
      }
      setFile(newFile);
      return false; // Prevent auto upload
    },
    onRemove: () => {
      setFile(null);
    },
  };

  const handleUpload = async () => {
    if (!file) {
      message.error('Please upload a file before submitting.');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(bulkDiagTestApi, formData, {
        responseType: 'blob', // Expecting a blob (file) in response for errors
      });

      if (response.status === 201) {
        const insertedEntries = await response.data.text(); // Convert blob to text
        const insertedIds = JSON.parse(insertedEntries).map(
          (entry) => entry._id,
        );
        const existingIds = profileData?.tests.map((test) => test._id);

        const updatedTest = [...existingIds, ...insertedIds];

        updateDc?.mutate(
          { data: { tests: updatedTest }, recordId: selectedDc },
          {
            onSuccess: () => {
              successAlert('Bulk upload successful!');
              invalidateQuery('diagnosticCenter');
            },
            onError: () => {
              errorAlert('Bulk upload failed!');
            },
          },
        );

        onClose();
      } else {
        const errorBlob = response.data;
        const errorUrl = window.URL.createObjectURL(new Blob([errorBlob]));
        const link = document.createElement('a');
        link.href = errorUrl;
        link.setAttribute('download', 'errors.xlsx');
        document.body.appendChild(link);
        link.click();
        errorAlert('Some records failed. Error file downloaded.');
      }
    } catch (error) {
      errorAlert('Upload failed, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Bulk Upload"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="download"
          href="https://res.cloudinary.com/drjut62wv/raw/upload/v1724871782/omerald/Production/BulkUpload/bulk_test_template.xlsx" // Update with your template URL
          icon={<DownloadOutlined />}
        >
          Download Template
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleUpload}
          disabled={!file}
        >
          Submit
        </Button>,
      ]}
    >
      <div className="mb-4">
        <Alert
          message="Bulk Upload Instructions"
          description="Please upload the file using the provided template. Ensure that all required fields are filled out correctly."
          type="info"
          showIcon
        />
      </div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Ensure the file follows the correct template format.
        </p>
      </Dragger>
    </Modal>
  );
};

export default BulkUploadModal;
