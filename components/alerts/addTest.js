import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { PencilIcon } from '@heroicons/react/20/solid';
import { report } from 'process';
import { useAuth } from '@/lib/auth';

export const AddTestModal = ({handleTestName}) => {
  const [open, setOpen] = useState(false);
  const [testName, setTestName] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true); 
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
    handleTestName(testName)
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setTestName(e.target.value)
   
  }


  return (
    <>
    <button onClick={showModal} className="bg-gray-200 rounded-md border-2 px-2 py-1 text-sm">Add test</button>
      <Modal
        title={"Add Test Name"}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
       <section className='grid grid-cols-3 my-6'>
           <p className='my-2'>Test Name: </p> <input name='testname' id='testname' value={testName} onChange={handleChange} className='border-2 border-gray-300 text-black px-2 py-1 my-1 w-[100%]'  />
       </section>
      </Modal>
    </>
  );
};
