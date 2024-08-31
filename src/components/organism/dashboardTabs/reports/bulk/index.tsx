import React, { useState } from 'react';
import { Modal, Button, Upload, message, Alert } from 'antd';
import { InboxOutlined, DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { bulkDiagReportApi, bulkDiagTestApi } from '@utils/index';
import { errorAlert2, successAlert } from '@components/atoms/alerts/alert';
import {
  useCurrentBranchValue,
  useProfileValue,
} from '@components/common/constants/recoilValues';
import {
  usePersistedBranchState,
  usePersistedDCState,
} from '@components/common/recoil/hooks/usePersistedState';
import {
  useInvalidateQuery,
  useUpdateBranch,
  useUpdateDiagnostic,
} from '@utils/reactQuery';

const { Dragger } = Upload;

const BulkUploadModal = ({ visible, onClose }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const profileData = useProfileValue();
  const currentBranch = useCurrentBranchValue();
  const [selectedBranch] = usePersistedBranchState();
  const [selectedDC] = usePersistedDCState();
  const updateBranch = useUpdateBranch({});
  const invalidateQuery = useInvalidateQuery();

  const props = {
    name: 'file',
    multiple: false,
    beforeUpload: (newFile) => {
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
    const dcDetails = {
      diagnosticId: selectedDC,
      branchId: selectedBranch,
    };
    const formData = new FormData();
    formData.append('file', file);
    formData.append('jsonData', JSON.stringify(dcDetails));

    try {
      const response = await axios.post(bulkDiagReportApi, formData, {
        responseType: 'blob', // Expecting a blob (file) in response for errors
      });

      if (response.status === 201) {
        const insertedEntries = await response.data.text(); // Convert blob to text
        const insertedIds = JSON.parse(insertedEntries).map(
          (entry) => entry._id,
        );
        const existingIds = currentBranch?.reports.map((report) => report._id);
        const updatedReports = [...existingIds, ...insertedIds];

        updateBranch?.mutate(
          { data: { reports: updatedReports }, recordId: selectedBranch },
          {
            onSuccess: (res) => {
              successAlert('Bulk upload successful!');
              invalidateQuery('diagnosticBranch');
              invalidateQuery('diagnosticCenter');
            },
            onError: (res) => {
              errorAlert2('Bulk upload failed!');
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
        errorAlert2('Some records failed. Error file downloaded.');
      }
    } catch (error) {
      errorAlert2('Upload failed, please try again.');
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
          href="https://res.cloudinary.com/drjut62wv/raw/upload/v1725033175/omerald/Production/BulkUpload/bulk_reports_template.xlsx" // Update with your template URL
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
