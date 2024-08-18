import { ArrowUpIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Upload,
} from "antd";
import { useRecoilState } from "recoil";
import { useCurrentBranchValue } from "@components/common/constants/recoilValues";
import { reportDataState } from "@components/common/recoil/report/reportData";
import {
  errorAlert,
  errorAlert2,
  successAlert,
} from "@components/atoms/alerts/alert";
import { uploadDiagnosticReportApi } from "@utils/index";
import moment from "moment";
import axios from "axios";
import { useState } from "react";
import { Loader } from "@components/atoms/loader/loader";
import { reportState } from "@components/common/recoil/report";
import { report } from "process";

interface UploadReportProps {
  next: () => void;
  setManualReport: (value: boolean) => void;
  manualReport: boolean;
  form: any;
}

export const UploadReport: React.FC<UploadReportProps> = ({
  next,
  setManualReport,
  manualReport,
  form,
}) => (
  <div className="px-8 py-2">
    <section className="w-[70vh] h-auto xl:min-h-[40vh] xl:mt-4">
      <ReportHeader
        manualReport={manualReport}
        setManualReport={setManualReport}
      />
      {manualReport ? (
        <GenerateReport next={next} form={form} />
      ) : (
        <UploadReportFile form={form} next={next} />
      )}
    </section>
  </div>
);

const ReportHeader: React.FC<{
  manualReport: boolean;
  setManualReport: (value: boolean) => void;
}> = ({ manualReport, setManualReport }) => (
  <Select
    placeholder="Select Report Creation Type"
    defaultValue={manualReport ? manualReport : false}
    onChange={(value) => setManualReport(Boolean(value))}
    className="my-6"
  >
    <Select.Option value={false}>Upload Existing Report</Select.Option>
    <Select.Option value={true}>Generate Omerald Powered Report</Select.Option>
  </Select>
);

interface UploadReportFileProps {
  next: () => void;
  form: any;
}

const UploadReportFile: React.FC<UploadReportFileProps> = ({ next, form }) => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [reportData, setReportdata] = useRecoilState(reportDataState);

  const onFinish = async (values: any) => {
    const formData = new FormData();

    if (fileList.length > 0) {
      setLoading(true);
      formData.append("file", fileList[0]);

      try {
        const resp = await axios.post(uploadDiagnosticReportApi, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (resp?.status === 200) {
          const currentValues = form.getFieldsValue();
          const updatedReportData = {
            ...currentValues.reportData?.[0], // Preserve existing data
            url: resp?.data?.url, // Update the URL field
          };

          // Update the form values with the new URL
          form.setFieldsValue({
            reportData: [updatedReportData],
          });

          // Update the Recoil state with the new URL
          setReportdata({
            ...reportData,
            reportData: updatedReportData, // Save the updated report data in Recoil
          });
          successAlert("File upload successful");
        }
      } catch (error) {
        errorAlert("File upload failed");
      } finally {
        setLoading(false);
        setFileList([]);
      }
    } else {
      // If there's no file to upload, just update Recoil with the existing form data
      const formDataWithoutFile = form.getFieldsValue().reportData[0];
      setReportdata({
        ...reportData,
        reportData: formDataWithoutFile,
      });
    }
    next(); // Proceed to the next step
  };

  const handleFileChange = (info: any) => {
    const updatedFileList = info.fileList.slice(-1); // Limit to one file
    setFileList(updatedFileList.map((file) => file.originFileObj));
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        reportData: [{}], // Ensure there is an initial set of fields
      }}
    >
      <Form.List name="reportData">
        {(fields, { add }) => {
          // Add initial field if the list is empty
          if (fields.length === 0) {
            add(); // Add an empty field when no fields exist
          }

          return fields.map(({ key, name, ...restField }) => (
            <div key={key}>
              <Form.Item
                {...restField}
                name={[name, "reportName"]}
                label="Enter Report Name"
                rules={[
                  { required: true, message: "Please input the report name!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, "file"]}
                label="Upload Report File"
              >
                <Upload
                  beforeUpload={() => false} // Prevent automatic upload
                  listType="text"
                  onChange={handleFileChange}
                  fileList={fileList.map((file, index) => ({
                    uid: index.toString(),
                    name: file.name,
                    status: "done",
                  }))}
                >
                  <Button className="flex">
                    <ArrowUpIcon className="w-4 pt-1" />
                    Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, "reportDate"]}
                label="Report Date"
              >
                <DatePicker />
              </Form.Item>
            </div>
          ));
        }}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
      {loading && <Loader />}
    </Form>
  );
};

const GenerateReport: React.FC<{ next: () => void, form: any }> = ({ next, form }) => {
  const [reportData, setReportData] = useRecoilState(reportDataState);
  const [testId, setTestId] = useRecoilState(reportState);
  const currentBranch = useCurrentBranchValue();

  const onFinish = (values: any) => {
    if (!values?.pathologist?.name)
      return errorAlert2("Please Add Pathologist Details");
      setTestId(values?.reportType)
      setReportData({ ...reportData, reportData: form.getFieldsValue() });
      next();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        reportData: [{}], // Ensure there is an initial set of fields
      }}
    >
      <Form.Item
        name="reportName"
        label="Enter Report Name"
        rules={[{ required: true, message: "Please input the report name!" }]}
      >
        <Input />
      </Form.Item>
      <Row gutter={10}>
        <Col>
          <Form.Item name="reportDate" label="Report Date">
            <DatePicker />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="reportType"
            label="Choose Report Type"
            rules={[
              { required: true, message: "Please select a report type!" },
            ]}
          >
            <Select showSearch placeholder="Select a report type">
              {currentBranch?.tests?.map((item) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.testName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name={["pathologist", "name"]} label="Pathologist">
        <Select showSearch placeholder="Select pathologist">
          {currentBranch?.pathologistDetail?.map((path) => (
            <Select.Option key={path._id} value={path.name}>
              {path.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
