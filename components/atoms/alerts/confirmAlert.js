import { Button, Modal, Space } from 'antd';

export const ConfirmAlert = () => {

  const { confirm } = Modal;
  confirm({
    title: 'Do you want to delete this item?',
    content: 'This action cannot be undone.',
    onOk() {
      // Handle the user's confirmation
    },
    onCancel() {
      // Handle the user's cancellation
    },
  });
  
  return <Space>
          <Button onClick={()=>{confirm()}}>
            Confirm
          </Button>
  </Space>
}