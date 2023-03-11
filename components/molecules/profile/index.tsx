import { errorAlert, successAlert } from '@components/atoms/alerts/alert'
import ErrorComp from '@components/atoms/alerts/error'
import { Spinner } from '@components/atoms/loader'
import { PencilIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserDetails, uploadImage } from 'utils/hook/userDetail'
import { SET_DIAGNOSTIC_DETAILS } from 'utils/store/types'
import { profileForm } from 'utils/types/molecules/forms.interface'
import { DynamicFormCreator } from '../form/dynamicForm'
import React, { useState } from 'react'

export const ProfileSummaryComponent = ({style,props,summary}:any) => {

  const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
  const profile = summary ? props: diagnosticDetails

  return (
    <div className='h-auto '>
        {summary && <>{profile && profile.diagnosticName && <ProfileSummary profile={profile} style={style} />}</>}
        {!summary && <>{profile && profile.diagnosticName && <ProfileView profile={profile} style={style} />}</> }
        {!profile?.diagnosticName && <ErrorComp/>}
    </div>
  )
}

const ProfileSummary = ({profile,style}:any) => {
  return (
    <section>
               <div className={`w-[70vw] p-4 bg-white relative rounded-lg h-auto text-left ${style}`}>
                  <section>
                    <img src={profile?.brandDetails?.brandLogo?.[0]?.thumbUrl } alt="logo" className='w-[5vw] rounded-full border-2' />
                     <section className='grid grid-cols-2 w-[70%]'> 
                        <aside>
                          <p className='my-8 font-bold text-sm'>{"Diagnostic Center Name: "}<span className='text-black font-light'>{profile?.diagnosticName}</span></p>
                          <p className='my-8 font-bold text-sm'>{"Email: "}<span className='text-black font-light lowercase'>{profile?.email}</span></p>
                          <p className='my-8 font-bold text-sm'>{"Contact: "}<span className='text-black font-light'>{profile?.phoneNumber}</span></p>

                          <p className='my-8 font-bold text-sm'>{"Facebook Url "}<a href={profile?.brandDetails?.facebookUrl} className='text-black font-light'>{profile?.brandDetails?.facebookUrl}</a></p>
                          <p className='my-8 font-bold text-sm'>{"Instagram Url: "}<a href={profile?.brandDetails?.instaUrl} className='text-black font-light lowercase'>{profile?.brandDetails?.instaUrl}</a></p>
                        </aside>
                        <aside>
                          <p className='my-8 font-bold text-sm'>{"Branch Name: "}<span className='text-black font-light'>{profile?.branchDetails?.[0]?.branchName}</span></p>
                          <p className='my-8 font-bold text-sm'>{"Branch Email: "}<span className='text-black font-light lowercase'>{profile?.branchDetails?.[0]?.branchEmail}</span></p>
                          <p className='my-8 font-bold text-sm'>{"Branch Contact: "}<span className='text-black font-light'>{profile?.branchDetails?.[0]?.branchContact}</span></p>
                          <p className='my-8 font-bold text-sm'>{"Branch Address "}<span className='text-black font-light'>{profile?.branchDetails?.[0]?.branchAddress}</span></p>
                        </aside>
                     </section>
                  </section>
               </div>
    </section>
  )
} 

const ProfileView = ({profile,style}:any) => {
  const [edit,setEdit] = useState(false);
  const [loading,setLoading] = useState(false);
  const [image,setImage] = useState();
  const { confirm } = Modal;
  const dispatch = useDispatch();
  
  const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
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
              let brandDetails = {"brandLogo":location,"facebookUrl":value.facebookUrl,"instaUrl":value.instaUrl}
              let diag = {...diagnosticDetails,"diagnosticName":value.diagnosticName,"email":value.email,brandDetails:brandDetails}
              let resp2 = await updateUserDetails({"phoneNumber":diagnosticDetails?.phoneNumber},diag)
              if(resp2.status==200){
                dispatch({type:SET_DIAGNOSTIC_DETAILS,payload:diag})
                successAlert("Profile updated sucessfully")
                setEdit(false)
              }
            }else{
              errorAlert("Error uploading profile")
            }
        }
        else {
              let brandDetails = {"facebookUrl":value.facebookUrl,"instaUrl":value.instaUrl,"brandLogo":diagnosticDetails?.brandDetails?.brandLogo}
              let diag = {...diagnosticDetails,"diagnosticName":value.diagnosticName,"email":value.email,"brandDetails":brandDetails}
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

  let initialValues={
    remember: true,
    phoneNumber:diagnosticDetails?.phoneNumber,
    diagnosticName: diagnosticDetails?.diagnosticName,
    email: diagnosticDetails?.email,
    facebookUrl: diagnosticDetails?.brandDetails?.facebookUrl,
    instaUrl: diagnosticDetails?.brandDetails?.instaUrl,
    brandLogo: diagnosticDetails?.brandDetails?.brandLogo
  }

  return (
    <section>
        <div className={`w-auto p-4 bg-white mt-14 relative rounded-lg h-auto text-left ${style}`}>
          {!edit ? <a href='#' onClick={()=>{setEdit(!edit)}}><PencilIcon className='w-6 absolute right-20' /></a> :<a href='#' onClick={()=>{setEdit(!edit)}}><XMarkIcon className='w-6 absolute right-20' /></a>}
          {
            !edit ? 
            <>
              <section>
              <img src={profile?.brandDetails?.brandLogo} alt="logo" className='w-[7vw] h-[7vw] rounded-full border-2' />
              <section className='grid grid-cols-2 gap-[10vw] w-[100%]'> 
                          <aside>
                            <p className='my-8 font-bold text-sm'>{"Diagnostic Center Name: "}<span className='text-black font-light'>{profile?.diagnosticName}</span></p>
                            <p className='my-8 font-bold text-sm'>{"Email: "}<span className='text-black font-light lowercase'>{profile?.email}</span></p>
                            <p className='my-8 font-bold text-sm'>{"Contact: "}<span className='text-black font-light'>{profile?.phoneNumber}</span></p>

                            <p className='my-8 font-bold text-sm'>{"Facebook Url "}<a href={profile?.brandDetails?.facebookUrl} className='text-black font-light'>{profile?.brandDetails?.facebookUrl}</a></p>
                            <p className='my-8 font-bold text-sm'>{"Instagram Url: "}<a href={profile?.brandDetails?.instaUrl} className='text-black font-light lowercase'>{profile?.brandDetails?.instaUrl}</a></p>
                          </aside>
                          <aside>
                            <p className='my-8 font-bold text-sm'>{"Branch Name: "}<span className='text-black font-light'>{profile?.branchDetails?.[0]?.branchName}</span></p>
                            <p className='my-8 font-bold text-sm'>{"Branch Email: "}<span className='text-black font-light lowercase'>{profile?.branchDetails?.[0]?.branchEmail}</span></p>
                            <p className='my-8 font-bold text-sm'>{"Branch Contact: "}<span className='text-black font-light'>{profile?.branchDetails?.[0]?.branchContact}</span></p>
                            <p className='my-8 font-bold text-sm'>{"Branch Address "}<span className='text-black font-light'>{profile?.branchDetails?.[0]?.branchAddress}</span></p>
                          </aside>
              </section>
              </section>
            </>:
            <>
              <section className='my-2 w-[50vw] pr-[16vw]'>  
                <p className='mb-6 italic font-bold text-md'>Edit your profile</p>
                {/* <img className="w-20 h-20 rounded-full" src={diagnosticDetails?.brandDetails?.brandLogo} alt="logo"/> */}
                <DynamicFormCreator initial={initialValues} handleImage={handleImage} formStyle=' my-4 gap-x-4 gap-y-4'  buttonText="Continue" 
                formProps={profileForm} handleSubmit={handleSubmit}/>
              </section>
            </>
          }
        </div>
        {loading && <Spinner/>}
    </section>
  )
} 
