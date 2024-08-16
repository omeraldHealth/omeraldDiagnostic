import { Button } from "antd";
import { ViewParameters } from "./view";
import AddParameters from "./create";

export const ParameterComp = ({handleNext, handlePrevious}) => {
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
                <AddParameters />
            </section>

        </section>
    );
};