import { Card, List, Typography } from "antd";
import { FaTrash } from "react-icons/fa";

const { Title, Text } = Typography;

// Sample data based on provided schema
const sampleData = {
  basicRange: [
    {
      unit: "mm",
      min: 2,
      max: 22,
    },
  ],
  advanceRange: {
    ageRange: [],
    genderRange: [],
    customCategory: [],
  },
};

const RenderRanges = ({ data, onRemove }) => {
  if (!data || !data?.advanceRange) {
    return null;
  }

  return (
    <div>
      {/* Render Basic Range */}
      <Title level={5}>Basic Range</Title>
      <List
        dataSource={data.basicRange}
        renderItem={(item, index) => (
          <List.Item
            key={index}
            actions={[
              <FaTrash
                onClick={() => onRemove("basicRange", index)}
                style={{ cursor: "pointer" }}
              />,
            ]}
          >
            <section className="flex ">
              <p className="mr-2">
                <strong>Unit:</strong> {item.unit}
              </p>
              <p className="mr-2">
                <strong>Min:</strong> {item.min}
              </p>
              <p className="mr-2">
                <strong>Max:</strong> {item.max}
              </p>
            </section>
          </List.Item>
        )}
      />

      {/* Render Advance Range (Age Range, Gender Range, Custom Category) */}
      <Title level={5}>Advance Range</Title>

      {/* Age Range */}
      {data?.advanceRange?.ageRange?.length > 0 && (
        <>
          <Title level={5}>Age Range</Title>
          <List
            dataSource={data?.advanceRange?.ageRange}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                actions={[
                  <FaTrash
                    onClick={() => onRemove("ageRange", index)}
                    style={{ cursor: "pointer" }}
                  />,
                ]}
              >
                <section className="flex ">
                  <p className="mr-2">
                    <strong>Unit:</strong> {item.unit}
                  </p>
                  <p className="mr-2">
                    <strong>Min:</strong> {item.min}
                  </p>
                  <p className="mr-2">
                    <strong>Max:</strong> {item.max}
                  </p>
                </section>
              </List.Item>
            )}
          />
        </>
      )}

      {/* Gender Range */}
      {data.advanceRange.genderRange.length > 0 && (
        <>
          <Title level={5}>Gender Range</Title>
          <List
            dataSource={data.advanceRange.genderRange}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                actions={[
                  <FaTrash
                    onClick={() => onRemove("genderRange", index)}
                    style={{ cursor: "pointer" }}
                  />,
                ]}
              >
                <section className="flex ">
                  <p className="mr-2">
                    <strong>Unit:</strong> {item.unit}
                  </p>
                  <p className="mr-2">
                    <strong>Min:</strong> {item.min}
                  </p>
                  <p className="mr-2">
                    <strong>Max:</strong> {item.max}
                  </p>
                </section>
              </List.Item>
            )}
          />
        </>
      )}

      {/* Custom Category */}
      {data.advanceRange.customCategory.length > 0 && (
        <>
          <Title level={5}>Custom Category</Title>
          {/* Assuming customCategory has a similar structure for display */}
          <List
            dataSource={data.advanceRange.customCategory}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                actions={[
                  <FaTrash
                    onClick={() => onRemove("customCategory", index)}
                    style={{ cursor: "pointer" }}
                  />,
                ]}
              >
                <Card>
                  {/* Display fields from customCategory schema */}
                  <Text>
                    <strong>Category Name:</strong> {item.categoryName}
                  </Text>
                  <br />
                  <Text>
                    <strong>Description:</strong> {item.description}
                  </Text>
                </Card>
              </List.Item>
            )}
          />
        </>
      )}
    </div>
  );
};

export default RenderRanges;
