
import { bannerDashboard, doctorAvatar } from "@/components/core/images/image";
import {CategoryScale} from 'chart.js';
import { useAuth } from "@/lib/auth";
import { BeakerIcon, ChartBarIcon, ShareIcon } from "@heroicons/react/20/solid";
import React from "react";
import ReportSharedVsTime2 from "@/components/Graphs/ReportSharedVsTime2";
import Chart from 'chart.js/auto';
import Link from "next/link";

const Dashboard = () => {

  const {diagnosticDetails, signOut } = useAuth();
  Chart.register(CategoryScale);

  const activities = [
    {
      action: "uploaded",
      reporter: "Mohammed Saif",
      time:"3 days ago",
      reportName:"Blood Report",
      profile: doctorAvatar
    }
  ]

  return <div className="p-8">
    <section className="relative ">
      <img src={bannerDashboard} className="w-[100%]" alt="dashboard-banner" /> 
      <p className="absolute top-5 left-80 text-white">Welcome {diagnosticDetails?.fullName}!</p>
      <p className="absolute top-14 left-80 font-light text-sm text-gray-300">You have uploaded <span className="text-orange-400">{diagnosticDetails?.reports?.length} report</span> till date, 
          please use our add reports section to share more reports<br/> with your patients directly. Also total tests listed are <span className="text-orange-400">{10} </span> you can add more using the tests offered section.
       </p>
    </section>
    <section className="my-6 flex justify-between" >
        <Link href={"/test"}  passHref={true}>
          <section className="w-[20%] h-[14vh] p-4 flex justify-between bg-blue-900 rounded-md text-white">
              <BeakerIcon className="w-10" />
              <span className="mt-4">
                <p className="font-light text-sm">Tests Offered</p>
                <p className="font-bold text-2xl flex justify-end my-2">10</p>
              </span>
          </section>
        </Link>
        <Link href={"/reports"}  passHref={true}>
        <section className="w-[20%] h-[14vh] p-4 flex justify-between bg-indigo-900 rounded-md text-white">
            <ChartBarIcon className="w-10" />
            <span className="mt-4">
              <p className="font-light text-sm">Reports Uploaded</p>
              <p className="font-bold text-2xl flex justify-end my-2">10</p>
            </span>
        </section>
        </Link>
        <Link href={"/reports"}  passHref={true}>
        <section className="w-[20%] h-[14vh] p-4 flex justify-between bg-gray-500 rounded-md text-white">
            <ShareIcon className="w-10" />
            <span className="mt-4">
              <p className="font-light text-sm">Reports Shared</p>
              <p className="font-bold text-2xl flex justify-end my-2">8</p>
            </span>
        </section>
        </Link>
        <Link href={"/profile"}  passHref={true}>
        <section className="w-[20%] h-[14vh] p-4 flex justify-between bg-green-900 rounded-md text-white">
            <BeakerIcon className="w-10" />
            <span className="mt-4">
              <p className="font-light text-sm">Total Users/Branches</p>
              <p className="font-bold text-2xl flex justify-end my-2">10 / 5</p>
            </span>
        </section>
        </Link>

    </section>
    <section className="flex justify-between h-[45vh]">
      <section className="w-[60%] h-auto bg-white">
        <ReportSharedVsTime2 />
      </section>
      <section className="w-[30%] h-[100%] bg-white rounded-sm p-4">
        <p>Recent Activities</p>
        <p className="text-xs my-2 text-gray-400 font-light">Summary of the latest updated activities</p>
        {
          activities.slice(0,5).map(activity => {
            return ( 
              <section className="my-4 flex justify-between">
                  <span className="text-xs flex">
                    <img src={activity.profile} alt="user-avatar" className="w-10 rounded-full mr-4" />
                    <span>
                    <p className="text-light text-gray-600 mt-1">{activity.reporter} <span>{activity.action} report</span> <span className="text-orange-500">"{activity.reportName}"</span></p>
                    <p className="text-light text-indigo-600 mt-1">{activity.time}</p>
                    </span>
                  </span>
              </section>
            )
          })
        }
      </section>
    </section>
  </div>
};;

export default Dashboard;
