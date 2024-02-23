import { Card, Typography, Space, Tag, Button } from 'antd';

const { Title, Text } = Typography;

export const ReportSummary = ({handleSuccess, report, style }: any) => {

  return (
    <section>
      <div className={`w-[70vw] p-4 bg-white relative rounded-lg h-auto text-left ${style}`}>
        <section>
          <Title level={3}>Report Summary</Title>
          <Space direction="vertical">
            <Text>User Name: {report.userName}</Text>
            <Text>Email: {report.email}</Text>
            <Text>Gender: {report.gender}</Text>
            <Text>Doctor Name: {report.doctorName}</Text>
          </Space>

          <div style={{ marginTop: '16px' }}>
            <Button type="primary" href={report.reportUrl} target="_blank" rel="noopener noreferrer">
              View Report
            </Button>
          </div>
        </section>
      </div>
    </section>
  );
};