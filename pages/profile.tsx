
import { useAuth } from "@/lib/auth";
import { useAmp } from "next/amp";
import React from "react";

const Profile = () => {

  const {diagnosticDetails} = useAuth()
  return (
    <div className="p-4">
        <div className="w-[70vw] bg-white h-[70vh] m-10 p-10">
          <img src={diagnosticDetails?.brandDetails[0].brandLogo} className="w-[120px]  h-[120px] rounded-full border-2 border-gray-e00" alt="logo"/>
          
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
                <p className="font-light my-6">{diagnosticDetails?.diagnosticName} </p> 
                <p className="font-light my-6 lowercase">{diagnosticDetails?.phoneNumber} </p>  
                <p className="font-light my-6 lowercase">{diagnosticDetails?.email} </p> 
                <p className="font-light my-6">{diagnosticDetails?.branch} </p> 
                <p className="font-light my-6 lowercase overflow-hidden max-w-[100%] max-h-[3vh]">{diagnosticDetails?.address} </p>
                <p className="font-light my-6">{diagnosticDetails?.tests?.length} </p> 
                {/* <p className="font-light my-6">{diagnosticDetails?.brandDetails?.facebookUrl ? diagnosticDetails?.brandDetails?.facebookUrl: "Not found"} </p> 
                <p className="font-light my-6">{diagnosticDetails?.brandDetails?.instaUrl ? diagnosticDetails?.brandDetails?.facebookUrl : "Not found"} </p>  */}
              </section>
          </section>
          <section className="w-[50%] grid grid-cols-3 pl-10">
              <section className="mt-4">
                <p className="font-bold my-6">Facebook url:</p>
                <p className="font-bold my-6">Instagram url :</p>
                <p className="font-bold my-6">Manager Name :</p>
                <p className="font-bold my-6">Manager Role :</p>
                <p className="font-bold my-6">Manager Signature :</p>
              </section>
              <section className="mt-4 col-span-2">
                <a target={"_blank"} href={diagnosticDetails?.brandDetails[0].facebookUrl} className="font-light my-6 block text-blue-400">{diagnosticDetails?.brandDetails[0].facebookUrl ? diagnosticDetails?.brandDetails[0].facebookUrl: "Not found"} </a> 
                <a target={"_blank"} href={diagnosticDetails?.brandDetails[0].instaUrl} className="font-light my-6  text-blue-400">{diagnosticDetails?.brandDetails[0].instaUrl ? diagnosticDetails?.brandDetails[0].facebookUrl : "Not found"} </a> 
                <p className="font-light my-6 lowercase">{diagnosticDetails?.managersDetail[0].managerName} </p> 
                <p className="font-light my-6 lowercase">{diagnosticDetails?.managersDetail[0].managerRole} </p> 
                <img className="w-[40px] h-[40px]" src={diagnosticDetails?.managersDetail[0].managerSignature} alt="signature" /> 
              </section>
          </section>
          </section>
         
        </div>
    </div>
  );
};

export default Profile;
