import React from 'react'

export const ProfileSummaryComponent = ({style,props}:any) => {
  let profile = props

  return (
    <div className='mt-10 h-[70vh]'>
        <div className={`w-[70vw] bg-white rounded-lg h-auto text-left  ${style}`}>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj5Q2raMjAzWc3f7P5IK9YmXGlC4V3ZrTQMeHPzNpfx_8RyG_5sizbgCxLVJLXzwaRwAI&usqp=CAU'
           className='w-[100px] rounded-full border-2' />
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
                    {/* <p className="font-light my-6">{profile?.branchDetails ? profile?.branchDetails[0].branchName : "Not Found"} </p>  */}
                    {/* <p className="font-light my-6 lowercase overflow-hidden max-w-[100%] max-h-[3vh]">{profile?.branchDetails && profile?.branchDetails[0]?.branchAddress ? 
                        profile?.branchDetails[0]?.branchAddress :"Not found"
                    } </p> */}
                    <p className="font-light my-6">{profile?.tests ? profile?.tests?.length : 10} </p> 
                    {/* <p className="font-light my-6">{diagnostic?.brandDetails?.facebookUrl ? diagnostic?.brandDetails?.facebookUrl: "Not found"} </p> 
                    <p className="font-light my-6">{diagnostic?.brandDetails?.instaUrl ? diagnostic?.brandDetails?.facebookUrl : "Not found"} </p>  */}
                </section>
            </section>
            <section className="w-[50%] grid grid-cols-3 pl-10">
                <section className="mt-4">
                    <p className="font-bold my-6">Facebook url:</p>
                    <p className="font-bold my-6">Instagram url :</p>
                    <p className="font-bold my-6">Branch Name :</p>
                    <p className="font-bold my-6">Branch Location :</p>
                    {/* <p className="font-bold my-6">Manager Signature :</p> */}
                </section>
                <section className="mt-4 col-span-2">
                    <a target={"_blank"} href={profile?.brandDetails.facebookUrl} className="font-light my-6 block text-blue-400">{profile?.brandDetails.facebookUrl ? profile?.brandDetails.facebookUrl: "Not found"} </a> 
                    <a target={"_blank"} href={profile?.brandDetails.instaUrl} className="font-light my-6  text-blue-400">{profile?.brandDetails.instaUrl ? profile?.brandDetails.facebookUrl : "Not found"} </a> 
                    {/* <p className="font-light my-6 lowercase">{profile?.branchDetails && profile?.branchDetails[0].branchName ? profile?.branchDetails[0].branchName : "Not found"} </p> 
                    <p className="font-light my-6 lowercase">{profile?.branchDetails && profile?.branchDetails[0].branchAddress ? profile?.branchDetails[0].branchAddress : "Not found"}</p>  */}
                </section>
            </section>
          </section>
        </div>
    </div>
  )
}


