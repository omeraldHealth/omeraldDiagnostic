import { bioRefState } from "@components/common/recoil/testDetails/test";
import { Button, Form, Radio } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import AdvanceRangeInput from "./advance";
import BasicRangeInput from "./basicRange";
import RenderRanges from "./showRefRange";

const InputForm = ({ edit }) => {
  const [rangeType, setRangeType] = useState("basic");
  const [bioRef, setBioRef] = useRecoilState(bioRefState);
  const [form] = Form.useForm();

  const [data, setData] = useState({
    basicRange: [],
    advanceRange: {
      ageRange: [],
      genderRange: [],
      customCategory: [],
    },
  });

  useEffect(() => {
    if (!edit) {
      //console.log"bio",bioRef)
      setBioRef(data);
    }
  }, []);

  const handleRangeTypeChange = (e) => {
    setRangeType(e.target.value);
    form.resetFields(); // Reset form when range type changes
  };

  const handleSubmit = (values) => {
    if (values) {
      const newData = transformData(values);

      setData((prevData) => {
        // Extract and update basicRange if newData has basicRange
        const updatedbasicRange = newData.basicRange
          ? [...(prevData.basicRange || []), ...newData.basicRange]
          : prevData.basicRange || [];

        // Update advanceRange if newData has any advance range data
        const updatedAdvanceRange = {
          ageRange: newData.advanceRange?.ageRange
            ? [
                ...(prevData.advanceRange?.ageRange || []),
                ...newData.advanceRange.ageRange,
              ]
            : prevData.advanceRange?.ageRange || [],
          genderRange: newData.advanceRange?.genderRange
            ? [
                ...(prevData.advanceRange?.genderRange || []),
                ...newData.advanceRange.genderRange,
              ]
            : prevData.advanceRange?.genderRange || [],
          customCategory: newData.advanceRange?.customCategory
            ? [
                ...(prevData.advanceRange?.customCategory || []),
                ...newData.advanceRange.customCategory,
              ]
            : prevData.advanceRange?.customCategory || [],
        };

        // Return updated state with basicRange and advanceRange updated
        return {
          ...prevData,
          basicRange: updatedbasicRange,
          advanceRange: updatedAdvanceRange,
        };
      });

      // Update param with the latest data
      setBioRef((prevData) => ({
        ...prevData,
        basicRange: [
          ...(prevData?.basicRange || []),
          ...(newData.basicRange || []),
        ],
        advanceRange: {
          ...prevData.advanceRange,
          ageRange: [
            ...(prevData.advanceRange?.ageRange || []),
            ...(newData.advanceRange?.ageRange || []),
          ],
          genderRange: [
            ...(prevData.advanceRange?.genderRange || []),
            ...(newData.advanceRange?.genderRange || []),
          ],
          customCategory: [
            ...(prevData.advanceRange?.customCategory || []),
            ...(newData.advanceRange?.customCategory || []),
          ],
        },
      }));

      // Reset form fields
      form.resetFields();
    }
  };

  const handleRemove = (type, index) => {
    setData((prevData) => {
      // Copy the current state
      let updatedBasicRange = [...prevData.basicRange];
      let updatedAdvanceRange = { ...prevData.advanceRange };

      // Update based on type
      if (type === "basicRange") {
        // Ensure we are modifying the right property
        updatedBasicRange.splice(index, 1);
      } else if (type === "ageRange") {
        updatedAdvanceRange.ageRange = updatedAdvanceRange.ageRange.filter(
          (_, i) => i !== index,
        );
      } else if (type === "genderRange") {
        updatedAdvanceRange.genderRange =
          updatedAdvanceRange.genderRange.filter((_, i) => i !== index);
      } else if (type === "customCategory") {
        updatedAdvanceRange.customCategory =
          updatedAdvanceRange.customCategory.filter((_, i) => i !== index);
      }

      // Return updated state
      return {
        ...prevData,
        basicRange: updatedBasicRange,
        advanceRange: updatedAdvanceRange,
      };
    });

    if (edit) {
      setBioRef((prevData) => {
        // Copy the current state
        let updatedBasicRange = [...prevData.basicRange];
        let updatedAdvanceRange = { ...prevData.advanceRange };

        // Update based on type
        if (type === "basicRange") {
          // Ensure we are modifying the right property
          updatedBasicRange.splice(index, 1);
        } else if (type === "ageRange") {
          updatedAdvanceRange.ageRange = updatedAdvanceRange.ageRange.filter(
            (_, i) => i !== index,
          );
        } else if (type === "genderRange") {
          updatedAdvanceRange.genderRange =
            updatedAdvanceRange.genderRange.filter((_, i) => i !== index);
        } else if (type === "customCategory") {
          updatedAdvanceRange.customCategory =
            updatedAdvanceRange.customCategory.filter((_, i) => i !== index);
        }

        // Return updated state
        return {
          ...prevData,
          basicRange: updatedBasicRange,
          advanceRange: updatedAdvanceRange,
        };
      });
    }
  };

  return (
    <section>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Select Range Type" name="rangeType">
          <Radio.Group onChange={handleRangeTypeChange} value={rangeType}>
            <Radio.Button value="basic">Basic Range</Radio.Button>
            <Radio.Button value="advanced">Advanced Range</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {rangeType === "basic" ? (
          <BasicRangeInput form={form} />
        ) : (
          <AdvanceRangeInput form={form} />
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <RenderRanges data={bioRef} onRemove={handleRemove} />
    </section>
  );
};

export default InputForm;

const transformData = (incomingData) => {
  const { rangeOption, ageRangeType, ageRanges, genderRanges, basicRange } =
    incomingData;
  //console.log"incomingData", incomingData)
  // Initialize the base structure
  const transformedData = {
    basicRange: [], // Placeholder if basic ranges are needed in the future
    advanceRange: {
      ageRange: [],
      genderRange: [],
      customCategory: [], // Assuming no custom category is provided in this example
    },
  };

  // Handle different range options
  switch (rangeOption) {
    case "age":
      if (ageRangeType && ageRanges) {
        transformedData.advanceRange.ageRange = ageRanges.map((range) => ({
          ageRangeType, // Use the type from the incoming data
          unit: range.unit,
          min: range.min,
          max: range.max,
        }));
      }
      break;

    case "gender":
      if (genderRanges) {
        transformedData.advanceRange.genderRange = genderRanges.map(
          (range) => ({
            genderRangeType: genderRanges?.[0]?.gender, // Assuming this field is part of the gender range data
            unit: range.unit,
            min: range.min,
            max: range.max,
          }),
        );
      }
      break;

    // Handle other range options if needed
    default:
      transformedData.basicRange = basicRange.map((range) => ({
        unit: range.unit,
        min: range.min,
        max: range.max,
      }));
      break;
  }

  return transformedData;
};
