
import { bannerDashboard } from "@/components/core/images/image";
import ReportSharedVsTime2 from "@/components/Graphs/ReportSharedVsTime2";
import { useAuth } from "@/lib/auth";
import { BeakerIcon, ChartBarIcon, ShareIcon } from "@heroicons/react/20/solid";
import React from "react";
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';

const Dashboard = () => {

  const {diagnosticDetails, signOut } = useAuth();
  Chart.register(CategoryScale);


  return <div className="p-8">
    <section className="relative ">
      <img src={bannerDashboard} className="w-[100%]" alt="dashboard-banner" /> 
      <p className="absolute top-5 left-80 text-white">Welcome {diagnosticDetails?.fullName}!</p>
      <p className="absolute top-14 left-80 font-light text-sm text-gray-300">You have uploaded <span className="text-orange-400">{diagnosticDetails?.reports?.length} report</span> till date, 
          please use our add reports section to share more reports<br/> with your patients directly. Also total tests listed are <span className="text-orange-400">{10} </span> you can add more using the tests offered section.
       </p>
    </section>
    <section className="my-6 flex justify-between" >
        <section className="w-[20%] h-[14vh] p-4 flex justify-between bg-blue-900 rounded-md text-white">
            <BeakerIcon className="w-10" />
            <span className="mt-4">
              <p className="font-light text-sm">Tests Offered</p>
              <p className="font-bold text-2xl flex justify-end my-2">10</p>
            </span>
        </section>
        <section className="w-[20%] h-[14vh] p-4 flex justify-between bg-indigo-900 rounded-md text-white">
            <ChartBarIcon className="w-10" />
            <span className="mt-4">
              <p className="font-light text-sm">Reports Uploaded</p>
              <p className="font-bold text-2xl flex justify-end my-2">10</p>
            </span>
        </section>
        <section className="w-[20%] h-[14vh] p-4 flex justify-between bg-gray-500 rounded-md text-white">
            <ShareIcon className="w-10" />
            <span className="mt-4">
              <p className="font-light text-sm">Reports Shared</p>
              <p className="font-bold text-2xl flex justify-end my-2">8</p>
            </span>
        </section>
        <section className="w-[20%] h-[14vh] p-4 flex justify-between bg-green-900 rounded-md text-white">
            <BeakerIcon className="w-10" />
            <span className="mt-4">
              <p className="font-light text-sm">Total Users/Branches</p>
              <p className="font-bold text-2xl flex justify-end my-2">10 / 5</p>
            </span>
        </section>

    </section>
    <section className="w-[60%] bg-white">
      <ReportSharedVsTime2 />
    </section>
  </div>
};;

export default Dashboard;
