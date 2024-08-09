import { UserLayout } from '@components/templates/pageTemplate';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { createDC } from '@components/common/recoil/chooseDc';
import { useRouter } from 'next/router';
import { useUserValues } from '@components/common/constants/recoilValues';
import verifyProfile from "@public/verifyProfile.png"
import DiagnosticCard from './diagCard';
import AddDC from './addDC';
import { usePersistedDCState } from '@components/common/recoil/hooks/usePersistedState';
import { Button } from 'antd';
import { errorAlert } from '@components/atoms/alerts/alert';
import { Spinner } from '@chakra-ui/react';

const ChooseDc: React.FC = () => {
  const router = useRouter()
  const userValue = useUserValues();
  const createDCRecoil = useSetRecoilState(createDC)
  const [selectedDc, setSelectedDC] = usePersistedDCState();
  const [defaultValue, setDefaultValue] = useState();
  const [loading, setLoading] = useState(true);

  const handleCreateDC = () => {
    createDCRecoil(true)
    router.push("/onboard")
  }

  const handleSelectDC = (value: string) => {
    setSelectedDC(value)
  }

  const handleSubmit = () => {
    if(selectedDc){
      router.push("/dashboard")
    }else{
      errorAlert("Please select DC to proceed.")
    }
  }

  // Check user not empty and set default value
  useEffect(()=>{
    console.log(selectedDc)
    if(!userValue || Object.keys(userValue).length === 0){router.push("/verifyUser")}

     // @ts-ignore
    if(userValue?.diagnosticCenters?.length === 1){
       // @ts-ignore
      setSelectedDC(userValue?.diagnosticCenters?.[0]?.diagnostic?._id)
    } 

    // @ts-ignore
    if(!selectedDc && userValue && userValue?.diagnosticCenters){
      // @ts-ignore
      setDefaultValue(userValue?.diagnosticCenters?.[0]?._id)
      setLoading(false)
    }
  },[userValue])

  useEffect(()=>{
    if(selectedDc !== "choose" && selectedDc && selectedDc != null ){
      router.push("/dashboard")
    }
  },[selectedDc])

  return (
    <UserLayout tabDescription="Choose DC" tabName="Admin Diagnostic | Choose Diagnostic Center">
        {loading && <Spinner/>}
        <section  className='w-[60%] my-8 m-auto grid grid-cols-2 shadow-xl'>
          <section className="text-center">
                <img src={verifyProfile.src} alt="Verification" />
          </section>
          <section className="text-center">
            <h2 className="mt-10 font-bold text-xl text-purple-900">Choose Diagnostic Center to login</h2>
            <div className="min-h-[50vh] h-auto flex justify-center mt-10">
              <div>
                {userValue && defaultValue && <DiagnosticCard defaultValue={defaultValue} handleCardClick={handleSelectDC} userValue={userValue}/>}
                <AddDC handleCardClick={handleCreateDC} />
                <section className='flex justify-start'>
                  <Button className='w-[5vw]' onClick={()=>{handleSubmit()}} type='primary'>Proceed</Button>
                </section>
              </div>
            </div>
          </section>
        </section>
    </UserLayout>
  );
};

export default ChooseDc