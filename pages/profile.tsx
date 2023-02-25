
import { FormModal } from "@/components/alerts/modal";
import { useAuth } from "@/lib/auth";
import { updateTests } from "@/lib/db";
import { PencilIcon } from "@heroicons/react/20/solid";
import { useAmp } from "next/amp";
import React, { useState } from "react";

const Profile = () => {

  const {diagnosticDetails} = useAuth()
  let [diagnostic,setDiagnostic] = useState(diagnosticDetails)

  const record = {
    "diagnosticName":diagnostic?.diagnosticName,
    "email":diagnostic?.email,
    "branch":diagnostic?.branch,
    "address":diagnostic?.address,
    "facebookUrl":diagnostic?.brandDetails[0].facebookUrl,
    "instaUrl":diagnostic?.brandDetails[0].instaUrl,
    "managerName":diagnostic?.managersDetail[0].managerName,
    "manageRole":diagnostic?.managersDetail[0].managerRole
  }


  const handle= async(e:any)=>{
    let managersDetail = Object.assign(diagnostic?.managersDetail[0],{"managerName":e.managerName,"managerRole":e.manageRole });
    let brandDetails = Object.assign(diagnostic?.brandDetails[0],{"facebookUrl":e.facebookUrl,"instaUrl":e.instaUrl });
    setDiagnostic({...diagnostic,diagnosticName:e.diagnosticName,"email":e.email,address:e.address,branch:e.branch,address:e.address,brandDetails:[brandDetails],managersDetail:[managersDetail] })
    const resp = await updateTests(diagnostic,diagnostic?.phoneNumber)  
    if(resp?.status === 200){
    }
  }

 

  return (
    <div className="p-4 bg-signBanner">
        <div className="w-[70vw] bg-white rounded-lg h-[70vh] m-auto my-10 p-10">
          <section className="flex justify-between">
            <img src={diagnostic?.brandDetails[0].brandLogo} className="w-[120px]  h-[120px] rounded-full border-2 border-gray-e00" alt="logo"/>
            <a href="#" className="flex w-[3vw] align-top self-start gap-2">
            <a className="mt-1"><FormModal handle={handle} record={record} manual={false} /></a>
            Edit
            </a>
          </section>
          <section className="flex">
          <section className="w-[50%] grid grid-cols-3 border-r-2 border-gray-100">
              <section className="mt-4">
                <p className="font-bold my-6">Diagnostic Center :</p>
                <p className="font-bold my-6">Phone Number :</p>
                <p className="font-bold my-6">Email address :</p>
                <p className="font-bold my-6">Current Branch :</p>
                <p className="font-bold my-6">Address :</p>
                <p className="font-bold my-6">Total tests offered :</p>
              </section>
              <section className="mt-4 col-span-2">
                <p className="font-light my-6">{diagnostic?.diagnosticName} </p> 
                <p className="font-light my-6 lowercase">{diagnostic?.phoneNumber} </p>  
                <p className="font-light my-6 lowercase">{diagnostic?.email} </p> 
                <p className="font-light my-6">{diagnostic?.branch} </p> 
                <p className="font-light my-6 lowercase overflow-hidden max-w-[100%] max-h-[3vh]">{diagnostic?.address} </p>
                <p className="font-light my-6">{diagnostic?.tests?.length} </p> 
                {/* <p className="font-light my-6">{diagnostic?.brandDetails?.facebookUrl ? diagnostic?.brandDetails?.facebookUrl: "Not found"} </p> 
                <p className="font-light my-6">{diagnostic?.brandDetails?.instaUrl ? diagnostic?.brandDetails?.facebookUrl : "Not found"} </p>  */}
              </section>
          </section>
          <section className="w-[50%] grid grid-cols-3 pl-10">
              <section className="mt-4">
                <p className="font-bold my-6">Facebook url:</p>
                <p className="font-bold my-6">Instagram url :</p>
                <p className="font-bold my-6">Manager Name :</p>
                <p className="font-bold my-6">Manager Role :</p>
                {/* <p className="font-bold my-6">Manager Signature :</p> */}
              </section>
              <section className="mt-4 col-span-2">
                <a target={"_blank"} href={diagnostic?.brandDetails[0].facebookUrl} className="font-light my-6 block text-blue-400">{diagnostic?.brandDetails[0].facebookUrl ? diagnostic?.brandDetails[0].facebookUrl: "Not found"} </a> 
                <a target={"_blank"} href={diagnostic?.brandDetails[0].instaUrl} className="font-light my-6  text-blue-400">{diagnostic?.brandDetails[0].instaUrl ? diagnostic?.brandDetails[0].facebookUrl : "Not found"} </a> 
                <p className="font-light my-6 lowercase">{diagnostic?.managersDetail[0].managerName} </p> 
                <p className="font-light my-6 lowercase">{diagnostic?.managersDetail[0].managerRole} </p> 
                {/* <img className="w-[40px] h-[40px]" src={diagnostic?.managersDetail[0].managerSignature} alt="signature" />  */}
              </section>
          </section>
          </section>
        </div>
    </div>
  );
};

export default Profile;
