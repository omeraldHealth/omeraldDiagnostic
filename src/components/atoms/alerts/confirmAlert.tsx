import React from "react";
import { Button, Modal, Space } from "antd";

/**
 * ConfirmAlert component for displaying a confirmation modal.
 * @returns JSX element with a button to trigger the confirmation modal.
 */
const ConfirmAlert: React.FC = () => {
  const handleConfirm = () => {
    Modal.confirm({
      title: "Do you want to delete this item?",
      content: "This action cannot be undone.",
      onOk() {
        // Handle the user's confirmation
      },
      onCancel() {
        // Handle the user's cancellation
      },
    });
  };

  return (
    <Space>
      <Button onClick={handleConfirm}>Confirm</Button>
    </Space>
  );
};

export default ConfirmAlert;
