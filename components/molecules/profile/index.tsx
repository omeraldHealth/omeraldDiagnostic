import { successAlert } from '@components/atoms/alerts/alert'
import ErrorComp from '@components/atoms/alerts/error'
import { BodyText_1, BodyText_2 } from '@components/atoms/font'
import { BodyStyled_1 } from '@components/atoms/font/font.style'
import { Spinner } from '@components/atoms/loader'
import { BellAlertIcon, ClockIcon, PencilIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Modal } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserDetails, uploadImage } from 'utils/hook/userDetail'
import { SET_DIAGNOSTIC_DETAILS } from 'utils/store/types'

import { ProfileForm } from '../form/profileForm'

export const ProfileSummaryComponent = ({style,props,summary}:any) => {
  const profile = props
  // const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
  // const [edit,setEdit] = useState(false);
  // const [loading,setLoading] = useState(false);
  // const [image,setImage] = useState();
  // const { confirm } = Modal;
  // const dispatch = useDispatch();
  
  // const handleSubmit = async (value:any) => {
  //   confirm({
  //     title: 'Do you want to update this?',
  //     content: 'The action cannot be undone.',
  //    async onOk() {
  //       setLoading(true)
  //       value["brandLogo"] = image;
  //       if(image){
  //           let resp = await uploadImage(value["brandLogo"])
    
  //           if(resp){
  //             let location = resp
  //             let brandDetails = [{"brandLogo":location,"facebookUrl":value.facebookUrl,"instaUrl":value.instaUrl}]
  //             let diag = {...diagnosticDetails,"diagnosticName":value.diagnosticName,"email":value.email,brandDetails:brandDetails}
  //             let resp2 = await updateUserDetails({"phoneNumber":diagnosticDetails?.phoneNumber},diag)
  //             if(resp2.status==200){
  //               dispatch({type:SET_DIAGNOSTIC_DETAILS,payload:diag})
  //               successAlert("Profile updated sucessfully")
  //               setEdit(false)
  //             }
              
  //           }
  //       }
  //       else if(edit && !image){
  //         let brandDetails = [{"facebookUrl":value.facebookUrl,"instaUrl":value.instaUrl}]
  //             let diag = {...diagnosticDetails,"diagnosticName":value.diagnosticName,"email":value.email,brandDetails:brandDetails}
  //             let resp2 = await updateUserDetails({"phoneNumber":diagnosticDetails?.phoneNumber},diag)
  //             if(resp2.status==200){
  //               dispatch({type:SET_DIAGNOSTIC_DETAILS,payload:diag})
  //               successAlert("Profile updated sucessfully")
  //               setEdit(false)
  //             }
  //       }
    
  //       setLoading(false)
  //     }
  //   }
  //    )
  // }

  // const handleImage = (value:any) => {
  //   setImage(value.logo[0].originFileObj)
  // }


  // const profileForm = [
  //   {"name":"brandLogo","type":"logo","label":"Logo","required":true},
  //   {"name":"diagnosticName","type":"text","label":"Diagnostic Name","required":true},
  //   {"name":"email","type":"email","label":"Email","required":true,pattern:"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"},
  //   {"name":"facebookUrl","type":"text","label":"Facebook Url","required":true},
  //   {"name":"instaUrl","type":"text","label":"Instagram Url","required":true},
  // ]
  return (
    <div className='h-auto '>
        {summary ? <>{profile && profile.diagnosticName && <ProfileSummary profile={profile} style={style} />}</>:<></>  }
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
                          <p className='my-4 font-bold text-sm'>{"Diagnostic Center Name: "}<span className='text-black font-light'>{profile?.diagnosticName}</span></p>
                          <p className='my-4 font-bold text-sm'>{"Email: "}<span className='text-black font-light lowercase'>{profile?.email}</span></p>
                          <p className='my-4 font-bold text-sm'>{"Contact: "}<span className='text-black font-light'>{profile?.phoneNumber}</span></p>

                          <p className='my-4 font-bold text-sm'>{"Facebook Url "}<a href={profile?.brandDetails?.facebookUrl} className='text-black font-light'>{profile?.brandDetails?.facebookUrl}</a></p>
                          <p className='my-4 font-bold text-sm'>{"Instagram Url: "}<a href={profile?.brandDetails?.instaUrl} className='text-black font-light lowercase'>{profile?.brandDetails?.instaUrl}</a></p>
                        </aside>
                        <aside>
                          <p className='my-4 font-bold text-sm'>{"Branch Name: "}<span className='text-black font-light'>{profile?.branchDetails?.[0]?.branchName}</span></p>
                          <p className='my-4 font-bold text-sm'>{"Branch Email: "}<span className='text-black font-light lowercase'>{profile?.branchDetails?.[0]?.branchEmail}</span></p>
                          <p className='my-4 font-bold text-sm'>{"Branch Contact: "}<span className='text-black font-light'>{profile?.branchDetails?.[0]?.branchContact}</span></p>
                          <p className='my-4 font-bold text-sm'>{"Branch Address "}<span className='text-black font-light'>{profile?.branchDetails?.[0]?.branchAddress}</span></p>
                        </aside>
                     </section>
                  </section>
               </div>
    </section>
  )
} 