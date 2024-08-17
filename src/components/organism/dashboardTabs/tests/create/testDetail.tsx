import { FormControl, FormLabel, Input, Stack, Switch } from "@chakra-ui/react";
import { errorAlert2 } from "@components/atoms/alerts/alert";
import { Loader } from "@components/atoms/loader/loader";
import {
  useEditTestValues,
  useTestDetailValue,
} from "@components/common/constants/recoilValues";
import { testDetailsState } from "@components/common/recoil/testDetails";
import { useGetAdminReports } from "@utils/reactQuery";
import { Button, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

function TestDetailTab({ handleNext }) {
  const testDetail = useTestDetailValue();

  const handleSubmit = () => {
    if (!testDetail?.testName?.trim() || !testDetail?.sampleName?.trim()) {
      errorAlert2("Please add a valid test and sample name");
      return;
    }
    handleNext();
  };

  return (
    <div>
      <TestDetail handleNext={handleSubmit} />
    </div>
  );
}

const TestDetail = ({ handleNext }) => {
  const [selectedValue, setSelectedValue] = useState(false);
  return (
    <div>
      <TestDetailHeader
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />
      {selectedValue ? (
        <OmeraldTestReports handleNext={handleNext} />
      ) : (
        <CustomTestDetails handleNext={handleNext} />
      )}
    </div>
  );
};

const TestDetailHeader: React.FC<any> = ({
  selectedValue,
  setSelectedValue,
}) => {
  return (
    <section>
      <section className="my-6">
        <p className="my-4 text-sm">
          You want to choose from existing reports?
        </p>
        <Radio.Group
          onChange={(event) => setSelectedValue(event.target.value)}
          value={selectedValue}
        >
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </section>
    </section>
  );
};

const CustomTestDetails: React.FC<any> = ({ handleNext }) => {
  const [formData, setFormData] = useState({
    testName: "",
    sampleName: "",
    isActive: true,
  });
  const [testDetail, setTestDetail] = useRecoilState(testDetailsState);
  const editTestState = useEditTestValues();
  const isEditTest = useEditTestValues();

  useEffect(() => {
    if (editTestState) {
      setFormData({
        testName: testDetail?.testName,
        sampleName: testDetail?.sampleName,
        isActive: testDetail?.isActive,
      });
    } else {
      setTestDetail({});
    }
  }, []);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, type, checked, value } = event.target;

    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: inputValue,
      };

      if (isEditTest) {
        setTestDetail({ ...testDetail, ...updatedFormData });
      }
      setTestDetail(updatedFormData);
      return updatedFormData;
    });
  };

  const handleSubmit = () => {
    handleNext();
  };

  return (
    <section>
      <form className="space-y-4 w-[20%]">
        <Stack spacing={4}>
          <FormControl className="my-1" id="testName" isRequired>
            <FormLabel>Test Name</FormLabel>
            <Input
              name="testName"
              value={formData.testName}
              onChange={handleChange}
              placeholder="Add Test Name"
            />
          </FormControl>
          <FormControl className="my-1" id="sampleName" isRequired>
            <FormLabel>Sample Name</FormLabel>
            <Input
              name="sampleName"
              value={formData.sampleName}
              onChange={handleChange}
              placeholder="Add Sample Name"
            />
          </FormControl>
          <FormControl className="my-1" id="isActive">
            <FormLabel>IsActive</FormLabel>
            <Switch
              name="isActive"
              isChecked={formData?.isActive}
              onChange={handleChange}
            />
          </FormControl>
        </Stack>
        <Button className="mt-4" onClick={handleSubmit} type="primary">
          Next
        </Button>
      </form>
    </section>
  );
};

const OmeraldTestReports: React.FC<any> = ({ handleNext }) => {
  const [formData, setFormData] = useState({
    testName: "",
    sampleName: "",
    parameters: [],
    isActive: true,
  });
  const [testDetail, setTestDetail] = useRecoilState(testDetailsState);

  const { data: adminReports, isLoading } = useGetAdminReports();
  const [selectedValue, setSelectedValue] = useState("");
  const { Option } = Select;

  useEffect(() => {
    if (!isLoading && adminReports) {
      const defaultValue = adminReports?.data[0];
      const updatedFormData = {
        ...formData,
        sampleName: defaultValue?.name || "",
        parameters: defaultValue?.parameters || [],
      };
      setFormData(updatedFormData);
      setTestDetail(updatedFormData);
      setSelectedValue(defaultValue?.name || "");
    }
  }, [isLoading, adminReports]);

  const handleDropChange = (value: string) => {
    const selectedOption = adminReports?.data.find(
      (report) => report?.name === value,
    );
    const updatedFormData = {
      ...formData,
      sampleName: value,
      parameters: selectedOption?.parameters || [],
    };
    setSelectedValue(value);
    setFormData(updatedFormData);
    setTestDetail(updatedFormData);
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, type, checked, value } = event.target;

    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: inputValue,
      };
      setTestDetail(updatedFormData);
      return updatedFormData;
    });
  };

  const handleSubmit = () => {
    //console.logtestDetail);
    handleNext();
  };

  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : (
        <form className="space-y-4 w-[20%]">
          <Stack spacing={4}>
            <FormControl className="my-1" id="testName" isRequired>
              <FormLabel>Test Name</FormLabel>
              <Input
                name="testName"
                value={formData.testName}
                onChange={handleChange}
                placeholder="Add Pathologist Name"
              />
            </FormControl>
            <FormControl className="my-1" id="sampleName" isRequired>
              <FormLabel>Sample Name</FormLabel>
              <Select
                showSearch
                value={selectedValue}
                placeholder="Select an option"
                style={{ width: "10vw" }}
                onChange={handleDropChange}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option?.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {adminReports?.data?.map((option) => (
                  <Option key={option.name} value={option.name}>
                    {option.name}
                  </Option>
                ))}
              </Select>
            </FormControl>
            <FormControl className="my-1" id="isActive">
              <FormLabel>IsActive</FormLabel>
              <Switch
                name="isActive"
                isChecked={formData?.isActive}
                onChange={handleChange}
              />
            </FormControl>
          </Stack>
          <Button className="mt-4" onClick={handleSubmit} type="primary">
            Next
          </Button>
        </form>
      )}
    </section>
  );
};

export default TestDetailTab;
