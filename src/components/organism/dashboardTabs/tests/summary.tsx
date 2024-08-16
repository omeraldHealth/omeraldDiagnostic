import { useTestDetailValue } from "@components/common/constants/recoilValues";
import React from "react";
import { ViewParameters } from "./parameters/view";
import { Button } from "antd";

export default function TestSummary({handlePrevious}) {
    const testDetails = useTestDetailValue()
    
    const handleSubmit = () => { }

    return (
        <div className="p-10 h-auto bg-signBanner">
            <b>Test Details</b>
            <section className="my-5 gap-10 flex text-gray-600">
                <p>Name: <span className="font-bold">{testDetails?.testName}</span>   </p>
                <p>Sample: <span className="font-bold">{testDetails?.sampleName}</span>   </p>
            </section>
            <ViewParameters />
            <Button className="mt-4" onClick={handleSubmit} type="primary">
                Submit
            </Button>
            <Button className="mt-4 mx-4" onClick={handlePrevious} type="default">
                Previous
            </Button>
        </div>
    );
}
