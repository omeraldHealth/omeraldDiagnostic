import React, { useState } from "react";
import { Button, Switch } from "antd";
import { ViewTest } from "./view";
import { AddTest } from "./create";
import BulkUploadModal from "./bulk";
import { ArrowTurnRightUpIcon } from "@heroicons/react/20/solid";

export default function TestTab() {
  const [showTest, setShowTest] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleShowTest = () => {
    setShowTest((prev) => !prev);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setShowTest(false)
  };

  return (
    <div className="p-0 h-auto bg-signBanner">
      <div className="flex justify-end p-2">
        <Switch
          checked={showTest}
          checkedChildren="Add"
          unCheckedChildren="View"
          onChange={toggleShowTest}
          className="bg-black"
        />
        {showTest && (
          <div className="ml-2">
            <Button type="primary" onClick={showModal} icon={<ArrowTurnRightUpIcon className="w-4 h-4" />}>
              Bulk Upload
            </Button>
            <BulkUploadModal visible={modalVisible} onClose={hideModal} />
          </div>
        )}
      </div>

      <div className="h-auto bg-white my-4 sm:mt-4 min-h-[70vh]">
        {showTest ? <AddTest handleShowTest={setShowTest} /> : <ViewTest />}
      </div>
    </div>
  );
}
