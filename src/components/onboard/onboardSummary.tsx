import { Col, Row } from 'antd';

export const OnboardingSummary = ({ formData }: any) => {
  return (
    <div className="container mx-auto px-8 py-4">
      <Row className="space-y-4">
        {formData?.brandLogo && (
          <Col span={6}>
            <div className="flex items-center mb-6 mt-2">
              <img
                src={formData?.brandLogo}
                alt="Brand Logo"
                className="w-[7vw] h-[7vw] rounded-full border-4 border-gray-200"
              />
            </div>
          </Col>
        )}
        <Col span={10}>
          <div className="">
            <h2 className="text-xl mb-4 font-semibold text-gray-800">
              Diagnostic Details
            </h2>
            <p className="text-gray-700  my-6">
              <strong>Diagnostic Name:</strong> {formData?.centerName}
            </p>
            <p className="text-gray-700  my-6">
              <strong>Diagnostic Phone Number:</strong> {formData?.phoneNumber}
            </p>
            <p className="text-gray-700  my-6">
              <strong>Diagnostic Email:</strong> {formData?.email}
            </p>
          </div>
        </Col>
        <Col span={8}>
          <div className="">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Branch Details
            </h2>
            <p className="text-gray-700  my-6">
              <strong>Branch Name:</strong> {formData?.branchName}
            </p>
            <p className="text-gray-700  my-6">
              <strong>Branch Email:</strong> {formData?.branchEmail}
            </p>
            <p className="text-gray-700  my-6">
              <strong>Branch Contact:</strong> {formData?.branchContact}
            </p>
            <p className="text-gray-700  my-6">
              <strong>Branch Location:</strong> {formData?.branchAddress}
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};
