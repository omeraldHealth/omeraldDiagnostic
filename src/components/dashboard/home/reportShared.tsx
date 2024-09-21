//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { DatePicker, InputNumber, Modal } from "antd";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import "chartjs-adapter-moment";
import moment from "moment";
import { useRecoilValue } from "recoil";
import { useDCProfileValue } from "@/utils/recoil/values";
import { branchState } from "@/utils/recoil";
import { Spinner } from "@chakra-ui/react";

const { RangePicker } = DatePicker;

const ReportSharedVsTime2 = () => {
  const profile = useDCProfileValue();
  const currentBranch = useRecoilValue(branchState);
  const [maxVal, setMaxVal] = useState<number>(20);
  const [dateRange, setDateRange] = useState<any>();
  const [date, setDate] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportCount, setReportCount] = useState<number[]>([]);

  const reportsList = currentBranch?.reports || [];

  useEffect(() => {
    const sixMonthsAgo = moment().subtract(6, "months").toDate();
    const current = moment().toDate();
    initialLoad(sixMonthsAgo, current);
    setMaxVal(profile?.reports?.length || 20);
  }, [currentBranch, profile]);

  const initialLoad = (start: any, end: any) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const { monthYearArray, counts } = getMonthYearArray(startDate, endDate, reportsList);
    setDate(monthYearArray);
    setReportCount(counts);
    setMaxVal(Math.max(...counts));
  };

  const generateDateRange = (data: any) => {
    const startDate = new Date(data?.[0].$d);
    const endDate = new Date(data?.[1].$d);
    const { monthYearArray, counts } = getMonthYearArray(startDate, endDate, reportsList);

    setDate(monthYearArray);
    setReportCount(counts);
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Reports Shared Last 6 months",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: maxVal,
        min: 0,
      },
      x: {
        type: "time",
        time: {
          unit: "month",
          displayFormats: {
            month: "MMM YYYY",
          },
          tooltipFormat: "MMM YYYY",
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
        },
      },
    },
  };

  const data = {
    labels: date,
    datasets: [
      {
        label: "Reports Uploaded",
        backgroundColor: "#3184D4",
        borderColor: "#3184D4",
        borderWidth: 2,
        data: reportCount,
      },
      {
        label: "Reports Shared",
        backgroundColor: "#D68006",
        borderColor: "#D68006",
        borderWidth: 2,
        data: [], // Add relevant data for "Reports Shared"
      },
    ],
  };

  const handleOk = () => {
    generateDateRange(dateRange);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    const sixMonthsAgo = moment().subtract(6, "months").toDate();
    const current = moment().toDate();
    initialLoad(sixMonthsAgo, current);
    setIsModalOpen(false);
  };

  const disabledDate = (current: any) => {
    return (
      (current && current < moment().subtract(6, "months").endOf("day")) ||
      current > moment().endOf("day")
    );
  };

  return (
    <section className="bg-white shadow-lg p-4 rounded-lg w-full h-auto sm:w-4/5 xl:w-1/2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Reports Shared Last 6 months</h2>
        <a href="#" onClick={() => setIsModalOpen(true)}>
          <span className="flex items-center text-red-500 hover:text-red-700">
            Choose Range <PencilSquareIcon className="w-5 h-5 ml-2" />
          </span>
        </a>
      </div>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Choose Range"
        okText="Apply"
        cancelText="Reset"
      >
        <div className="my-4">
          <p className="text-sm font-medium">Enter Range of report count (Between 0 to 1000)</p>
          <InputNumber
            min={1}
            max={1000}
            defaultValue={100}
            onChange={setMaxVal}
            className="w-full"
          />
        </div>

        <div className="my-4">
          <p className="text-sm font-medium">Choose Date range (6 months range)</p>
          <RangePicker
            onChange={setDateRange}
            disabledDate={disabledDate}
            picker="month"
            className="w-full"
          />
        </div>
      </Modal>

      {!profile ? (
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      ) : (
        <Bar data={data} options={options} />
      )}
    </section>
  );
};

export default ReportSharedVsTime2;

function getMonthYearArray(startDate: any, endDate: any, data: any) {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();
  const monthYearArray = [];
  const counts = [];

  for (let i = 0; i <= (endYear - startYear) * 12 + (endMonth - startMonth); i++) {
    const date = new Date(startYear, startMonth + i, 1);
    const monthYear = date.toLocaleString("default", { month: "short", year: "numeric" });
    monthYearArray.push(monthYear);

    // Count reports for this month
    const count = data.filter((report: any) => {
      const reportDate = new Date(report?.reportDate);
      return reportDate.getFullYear() === date.getFullYear() && reportDate.getMonth() === date.getMonth();
    }).length;
    counts.push(count);
  }

  return { monthYearArray, counts };
}
