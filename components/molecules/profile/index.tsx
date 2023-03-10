import { successAlert } from '@components/atoms/alerts/alert'
import { ErrorComp } from '@components/atoms/error'
import { Spinner } from '@components/atoms/loader'
import { ClockIcon, PencilIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Modal } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthContext } from 'utils/context/auth.context'
import { updateUserDetails, uploadImage } from 'utils/hook/userDetail'
import { SET_DIAGNOSTIC_DETAILS } from 'utils/store/types'

import { ProfileForm } from '../form/profileForm'

export const ProfileSummaryComponent = ({style,props}:any) => {
  
  const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
  const [edit,setEdit] = useState(false);
  const [loading,setLoading] = useState(false);
  const [image,setImage] = useState();
  const { confirm } = Modal;
  const dispatch = useDispatch();
  
  const handleSubmit = async (value:any) => {


    confirm({
      title: 'Do you want to update this?',
      content: 'The action cannot be undone.',
     async onOk() {
        setLoading(true)
        value["brandLogo"] = image;
        if(image){
            let resp = await uploadImage(value["brandLogo"])
    
            if(resp){
              let location = resp
              let brandDetails = [{"brandLogo":location,"facebookUrl":value.facebookUrl,"instaUrl":value.instaUrl}]
              let diag = {...diagnosticDetails,"diagnosticName":value.diagnosticName,"email":value.email,brandDetails:brandDetails}
              let resp2 = await updateUserDetails({"phoneNumber":diagnosticDetails?.phoneNumber},diag)
              if(resp2.status==200){
                dispatch({type:SET_DIAGNOSTIC_DETAILS,payload:diag})
                successAlert("Profile updated sucessfully")
                setEdit(false)
              }
              
            }
        }
        else if(edit && !image){
          let brandDetails = [{"facebookUrl":value.facebookUrl,"instaUrl":value.instaUrl}]
              let diag = {...diagnosticDetails,"diagnosticName":value.diagnosticName,"email":value.email,brandDetails:brandDetails}
              let resp2 = await updateUserDetails({"phoneNumber":diagnosticDetails?.phoneNumber},diag)
              if(resp2.status==200){
                dispatch({type:SET_DIAGNOSTIC_DETAILS,payload:diag})
                successAlert("Profile updated sucessfully")
                setEdit(false)
              }
        }
    
        setLoading(false)
      }
    }
     )
  }

  const handleImage = (value:any) => {
    setImage(value.logo[0].originFileObj)
  }


  const profileForm = [
    {"name":"brandLogo","type":"logo","label":"Logo","required":true},
    {"name":"diagnosticName","type":"text","label":"Diagnostic Name","required":true},
    {"name":"email","type":"email","label":"Email","required":true,pattern:"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"},
    {"name":"facebookUrl","type":"text","label":"Facebook Url","required":true},
    {"name":"instaUrl","type":"text","label":"Instagram Url","required":true},
  ]

  let profile = diagnosticDetails;
  return (
    <div className='mt-10 h-auto'>
        
        {profile ?  
          <div className={`w-[70vw] p-10 pb-20 bg-white relative rounded-lg h-auto text-left  ${style}`}>
            {!edit?<a href='#' onClick={()=>{setEdit(true)}}><PencilIcon className='w-6 absolute right-20' /></a> :
            <a href='#' onClick={()=>{setEdit(false)}}><XMarkIcon className='w-6 absolute right-20' /></a>
            }
            {edit?
            <section className='my-2 w-[50%]'>  
            <p className='mb-6 italic font-bold text-md'>Edit your profile</p>
            <ProfileForm formProps={profileForm} style="" buttonText='Update' handleImage={handleImage} handleSubmit={handleSubmit} />
            </section>:
            <section>
              <img src={profile?.brandDetails?.brandLogo?.[0]?.thumbUrl || profile.brandDetails[0].brandLogo} className='w-[70px] rounded-full border-2' />
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
                        <p className="font-light my-6">{profile?.diagnosticName ? profile?.diagnosticName : "Not Found"}   </p> 
                        <p className="font-light my-6">{profile?.phoneNumber ? profile?.phoneNumber: "Not Found"} </p>  
                        <p className="font-light my-6 lowercase">{profile?.email ?profile?.email:"Not found"} </p> 
                        <p className="font-light my-6">{profile?.branchDetails ? profile?.branchDetails?.[0]?.branchName : "Not Found"} </p> 
                        <p className="font-light my-6 lowercase overflow-hidden max-w-[100%] max-h-[3vh]">
                          {
                            profile?.branchDetails && profile?.branchDetails[0]?.branchAddress ? 
                            profile?.branchDetails[0]?.branchAddress :"Not found"
                          } 
                        </p>
                        <p className="font-light my-6">{profile?.tests ? profile?.tests?.length : 10} </p> 
                        {/* <p className="font-light my-6">{profile?.brandDetails[0]?.facebookUrl ? profile?.brandDetails[0]?.facebookUrl: "Not found"} </p> 
                        <p className="font-light my-6">{profile?.brandDetails[0]?.instaUrl ? profile?.brandDetails[0]?.facebookUrl : "Not found"} </p>  */}
                    </section>
                </section>
                <section className="w-[50%] grid grid-cols-3 pl-10">
                    <section className="mt-4">
                        <p className="font-bold my-6">Facebook url:</p>
                        <p className="font-bold my-6">Instagram url :</p>
                        <p className="font-bold my-6">Branch Name :</p>
                        <p className="font-bold my-6">Branch Location :</p>
                    </section>
                    <section className="mt-4 col-span-2">
                        <a target={"_blank"} href={profile?.brandDetails[0]?.facebookUrl} className="font-light my-6 block text-blue-400">{profile?.brandDetails[0].facebookUrl ? profile?.brandDetails[0].facebookUrl: "Not found"} </a> 
                        <a target={"_blank"} href={profile?.brandDetails[0]?.instaUrl} className="font-light my-6  text-blue-400">{profile?.brandDetails[0].instaUrl ? profile?.brandDetails[0].instaUrl : "Not found"} </a> 
                        <p className="font-light my-6 lowercase">{profile?.branchDetails[0]?.branchName ? profile?.branchDetails?.[0]?.branchName : "Not found"} </p> 
                        <p className="font-light my-6 lowercase">{profile?.branchDetails[0]?.branchAddress ? profile?.branchDetails?.[0]?.branchAddress : "Not found"}</p>  
                    </section>
                </section>
              </section>
            </section>
            }
          </div>: <ErrorComp pageName={"Profile"}/>
        }
        {
          loading && <Spinner/>
        }
       
    </div>
  )
}


