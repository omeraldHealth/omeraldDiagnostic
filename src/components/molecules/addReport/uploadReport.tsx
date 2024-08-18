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
import { reportDataState } from "../../common/recoil/report/reportData";
import {
  useCurrentBranchValue,
  useProfileValue,
} from "@components/common/constants/recoilValues";
import moment from "moment";

interface UploadReportProps {
  next: () => void;
  setManualReport: (value: boolean) => void;
  manualReport: boolean;
}

export const UploadReport: React.FC<UploadReportProps> = ({
  next,
  setManualReport,
  manualReport,
}) => (
  <div className="px-8 py-2">
    <section className="w-[70vh] h-auto xl:h-[40vh] xl:mt-4">
      <ReportHeader
        manualReport={manualReport}
        setManualReport={setManualReport}
      />
      {manualReport ? (
        <GenerateReport next={next} />
      ) : (
        <UploadReportFile next={next} />
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

const UploadReportFile: React.FC<{ next: () => void }> = ({ next }) => {
  const [form] = Form.useForm();
  const [reportData, setReportData] = useRecoilState(reportDataState);

  const onFinish = (values: any) => {
    setReportData({
      ...reportData,
      reportData: { ...values, reportDate: values.reportDate?.toDate() },
    });
    next();
  };

  const initialDateValue = reportData?.reportData?.reportDate
    ? moment(reportData.reportData.reportDate)
    : null;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        reportName: reportData?.reportData?.reportName,
        reportDate: initialDateValue,
      }}
    >
      <Form.Item
        name="reportName"
        label="Enter Report Name"
        rules={[{ required: true, message: "Please input the report name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="file"
        label="Upload Report File"
        rules={[{ required: true, message: "Please upload the report file!" }]}
      >
        <Upload
          beforeUpload={() => false}
          listType="text"
          customRequest={({ onSuccess }) =>
            setTimeout(() => onSuccess("ok"), 0)
          }
        >
          <Button icon={<ArrowUpIcon className="w-4" />}>
            Click to Upload
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item name="reportDate" label="Report Date">
        <DatePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const GenerateReport: React.FC<{ next: () => void }> = ({ next }) => {
  const [form] = Form.useForm();
  const [reportData, setReportData] = useRecoilState(reportDataState);
  const currentBranch = useCurrentBranchValue();

  const onFinish = (values: any) => {
    if (!values?.pathologist?.name)
      return errorAlert2("Please Add Pathologist Details");
    setReportData({ ...reportData, ...values });
    next();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        reportName: reportData?.reportData?.reportName,
        reportDate: reportData?.reportData?.reportDate
          ? moment(reportData.reportData.reportDate)
          : null,
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
