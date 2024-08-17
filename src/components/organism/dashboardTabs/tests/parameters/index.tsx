import { Button } from "antd";
import AddParameters from "./create";
import { ViewParameters } from "./view";

export const ParameterComp = ({ handleNext, handlePrevious }) => {
  return (
    <section>
      <ViewParameters />
      <section className="flex justify-between">
        <section className="flex">
          <Button className="mt-4" onClick={handleNext} type="primary">
            Next
          </Button>
          <Button className="mt-4 mx-4" onClick={handlePrevious} type="default">
            Previous
          </Button>
        </section>
        <AddParameters edit={false} />
      </section>
    </section>
  );
};
