import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { PencilIcon } from '@heroicons/react/20/solid';
import { report } from 'process';
import { useAuth } from '@/lib/auth';

export const FormModal = ({record,handle}) => {
  const [open, setOpen] = useState(false);
  const {diagnosticDetails} = useAuth()
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [keyword,setKeyWord] = useState([])

 useEffect(()=>{
    setKeyWord(Object.keys(record).map(key => [key, record[key]]));
  
 },[])

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');
   
    setConfirmLoading(true); 
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
    handle(record)
  };

  const handleCancel = () => {

    setOpen(false);
  };

  const handleChange = (e) => {
    record[e.target.name] = e.target.value
    setKeyWord(Object.keys(record).map(key => [key, record[key]]));
  }


  return (
    <>
      <a onClick={showModal}><PencilIcon className='w-4 text-btnPrimary-400'/></a>
      <Modal
        title={"Update Keyword"}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
       <section className='grid grid-cols-3 my-6'>
            {keyword.map((key,index)=>{
                return (
                    <>
                        {key[0] != "_id" &&
                            <>
                                <section className='font-bold col-span-1 my-1 '>{key[0]} :</section>
                                    <section className='col-span-2'>
                                    <input name={key[0]} value={key[1]} onChange={handleChange} className='border-2 border-gray-300 text-black px-2 py-1 my-1 w-[100%]' />
                                </section>
                            </>
                        }
                    </>
                )
            })}
       </section>
      </Modal>
    </>
  );
};
