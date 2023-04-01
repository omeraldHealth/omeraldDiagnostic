import { errorAlert, successAlert } from '@components/atoms/alerts/alert'
import { Spinner } from '@components/atoms/loader'
import { PencilIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Modal } from 'antd'
import { useDispatch } from 'react-redux'
import { uploadImage } from 'utils/hook/userDetail'
import { profileForm } from 'utils/types/molecules/forms.interface'
import { DynamicFormCreator } from '../form/dynamicForm'
import { useAuthContext } from 'utils/context/auth.context'
import { useQueryGetData, useUpdateDiagnostic } from 'utils/reactQuery'
import { getDiagnosticUserApi } from '@utils'
import React, { useState } from 'react'
import { useQueryClient } from 'react-query'

export const ProfileSummaryComponent = ({style,props,summary}:any) => {

  const {diagnosticDetails} = useAuthContext();
  const {data:diagnostic}  = useQueryGetData("getDiagnostic",getDiagnosticUserApi+diagnosticDetails?.phoneNumber)
  const profile = summary ? props: diagnostic?.data

  return (
    <div className='h-auto '>
        {summary && <>{profile && profile.diagnosticName && <ProfileSummary profile={profile} style={style} />}</>}
        {!summary && <>{profile && profile.diagnosticName && <ProfileView profile={profile} style={style} />}</> }
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
  const queryClient = useQueryClient();
  const {operator}=useAuthContext();
  const { confirm } = Modal;

  const updateDiagnostic = useUpdateDiagnostic({
    onSuccess: (data) => {
      successAlert("Profile updated sucessfully")
      queryClient?.invalidateQueries('getDiagnostic')
      setEdit(false)
    },
    onError: (error) => {
      successAlert("Error updating profile")
    },
  });
  
  const {diagnosticDetails} = useAuthContext();
  const {data:diagnostic}  = useQueryGetData("getDiagnostic",getDiagnosticUserApi+diagnosticDetails?.phoneNumber)

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
              let diag = {...diagnostic?.data,"diagnosticName":value.diagnosticName,"email":value.email,brandDetails:brandDetails}
              updateDiagnostic.mutate({phoneNumber:diagnosticDetails?.phoneNumber,data:diag})
            }else{
              errorAlert("Error uploading profile")
            }
        }
        else {
              let brandDetails = {"facebookUrl":value.facebookUrl,"instaUrl":value.instaUrl,"brandLogo":diagnostic?.data?.brandDetails?.brandLogo}
              let diag = {...diagnostic?.data,"diagnosticName":value.diagnosticName,"email":value.email,"brandDetails":brandDetails}
              updateDiagnostic.mutate({phoneNumber:diagnosticDetails?.phoneNumber,data:diag})
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
          
          { operator?.role === "owner" && <>
          {!edit ? <a href='#' onClick={()=>{setEdit(!edit)}}><PencilIcon className='w-6 absolute right-20' /></a> :<a href='#' onClick={()=>{setEdit(!edit)}}><XMarkIcon className='w-6 absolute right-20' /></a>}
          </> }
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
