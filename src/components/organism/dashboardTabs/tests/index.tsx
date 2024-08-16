import React, {useState } from "react";
import { Switch } from "antd";
import { ViewTest } from "./view";
import { AddTest } from "./create";

export default function TestTab() {
  const [showTest, setShowTest] = useState(false);

  return (
    <div className="p-0 h-auto bg-signBanner">
      <span className="flex justify-end">
        <Switch
          style={{ fontSize: "10px" }}
          checkedChildren="Add"
          unCheckedChildren="View"
          checked={showTest}
          className="bg-black"
          onChange={() => {
            setShowTest(!showTest);
          }}
        />
      </span>

      <div className="h-auto bg-white my-4 sm:mt-4  min-h-[70vh] ">
        {!showTest ? <ViewTest /> : <AddTest />}
      </div>
    </div>
  );
}
