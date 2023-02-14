
import { bannerDashboard, doctorAvatar } from "@/components/core/images/image";
import {CategoryScale} from 'chart.js';
import { useAuth } from "@/lib/auth";
import { BeakerIcon, ChartBarIcon, InformationCircleIcon, ShareIcon } from "@heroicons/react/20/solid";
import React, { useEffect } from "react";
import ReportSharedVsTime2 from "@/components/Graphs/ReportSharedVsTime2";
import Chart from 'chart.js/auto';
import Link from "next/link";
import { Tooltip } from "antd";
import { getReports } from "@/lib/db";

const Dashboard = () => {

  const {diagnosticDetails, signOut ,user} = useAuth();
  Chart.register(CategoryScale);

  useEffect(() => {
    (async () => {
      const token = await user?.getIdToken();

      const resp = await getReports(
        token as string,
        user?.phoneNumber as string
      );
      // console.log(resp);
      if (resp.status === 200) {
        if(diagnosticDetails?.reports?.length<1){
          diagnosticDetails?.reports.push(resp.data)
        }
      }
    })();
  }, []);

  return <div className="p-4 sm:p-6 xl:p-8 h-[112vh] sm:h-[94vh]">
    <section className="relative">
      <img src={bannerDashboard} className="w-[100%] h-[20vh] sm:h-auto" alt="dashboard-banner" /> 
      <p className="absolute top-5 left-[25%] xl:left-80 font-light text-white">Welcome {diagnosticDetails?.fullName}!</p>
      <p className="absolute top-14 left-[25%] xl:left-80 font-light text-xs xl:text-sm text-gray-300">You have uploaded <span className="text-orange-400">{diagnosticDetails?.reports?.length ?? 0} report</span> till date, 
          please use our add reports section to share more reports<br/> with your patients directly. Also total tests listed are <span className="text-orange-400">{diagnosticDetails?.tests?.length ?? 0} </span> you can add more using the tests offered section.
       </p>
    </section>
    <section className="my-6 grid grid-cols-2 gap-4 sm:flex justify-between" >
        <Link href={"/test"}  passHref={true}>
          <section className="sm:w-[23%] xl:w-[20%] h-[12vh] sm:h-[14vh] p-2 flex justify-between bg-blue-900 rounded-md text-white">
              <BeakerIcon className="w-10" />
              <span className="">
                <Tooltip color={'#e3a909'} title="Shows the count of tests offered by your laboratory">
                  <InformationCircleIcon className="w-4 float-right" />
               </Tooltip>
                <p className="font-bold text-2xl flex justify-center my-2 mt-4">{diagnosticDetails?.tests?.length ?? 0 }</p>
                <p className="font-light text-xs xl:text-sm">Tests Offered</p>
              </span>
          </section>
        </Link>
        <Link href={"/reports"}  passHref={true}>
        <section className="sm:w-[23%] xl:w-[20%] h-[12vh] sm:h-[14vh] p-2 flex justify-between bg-indigo-900 rounded-md text-white">
            <ChartBarIcon className="w-10" />
            <span >
              <Tooltip color={'#8c0625'} title="Shows the count of total reports uploaded by this account">
                  <InformationCircleIcon className="w-4 float-right" />
               </Tooltip>
             
              <p className="font-bold text-2xl flex justify-center my-2 mt-4">{diagnosticDetails?.reports?.length ?? 0 }</p>
              <p className="font-light text-xs xl:text-sm">Reports Uploaded</p>
            </span>
        </section>
        </Link>
        <Link href={"/reports"}  passHref={true}>
        <section className="sm:w-[23%] xl:w-[20%] h-[12vh] sm:h-[14vh] p-2 flex justify-between bg-gray-500 rounded-md text-white">
            <ShareIcon className="w-10" />
            <span>
                <Tooltip color={'#06688c'} title="Shows the count of total reports shared with users by this account">
                  <InformationCircleIcon className="w-4 float-right" />
               </Tooltip>
              <p className="font-bold text-2xl flex justify-center my-2 mt-4">{diagnosticDetails?.sharedReport?.length ?? 0 }</p>
              <p className="font-light text-xs xl:text-sm">Reports Shared</p>
            </span>
        </section>
        </Link>
        <Link href={"/profile"}  passHref={true}>
          <section className="sm:w-[23%] xl:w-[20%] h-[12vh] sm:h-[14vh] p-2 flex justify-between bg-green-900 rounded-md text-white">
              <BeakerIcon className="w-10" />
              <span >
                <Tooltip color={'#168c06'} title="Shows the count of total users and branches related to this account">
                    <InformationCircleIcon className="w-4 float-right" />
                </Tooltip>
            
                <p className="font-bold text-2xl flex justify-center my-2 mt-4">{diagnosticDetails?.managersDetail?.length ?? 0 } </p>
                <p className="font-light text-xs xl:text-sm">Total Users</p>
              </span>
          </section>
        </Link>
    </section>
    <section className="grid grid-cols-1 gap-4 sm:flex justify-between h-[45vh] my-4">
      <section className="sm:w-[65%] xl:w-[60%] h-[30vh] sm:h-auto bg-white">
        <ReportSharedVsTime2 />
      </section>
      <section className="sm:w-[30%] h-[100%] bg-white rounded-sm p-4 mb-10 sm:mb-0">
        <p>Recent Activities</p>
        <p className="text-xs my-2 text-gray-400 font-light">Summary of the latest updated activities</p>
        {
          diagnosticDetails?.activities ? diagnosticDetails?.activities?.map((activity,index) => {
            return ( 
              <section key={index} className="my-4 flex justify-between">
                  <span className="text-xs flex">
                    <img src={doctorAvatar} alt="user-avatar" className="w-10 rounded-full mr-4" />
                    <span>
                    <p className="text-light text-gray-600 mt-1">{activity.activity}</p>
                    <p className="text-light text-indigo-600 mt-1">{activity.updatedTime?.toDateString()}</p>
                    </span>
                  </span>
              </section>
            )
          }):
          <>
           <p className="text-light text-sm text-gray-600 mt-8">No Activities....</p>
          </>
        }
      </section>
    </section>
  </div>
};;

export default Dashboard;
