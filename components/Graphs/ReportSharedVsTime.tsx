import { ReportDetails } from "middleware/models.interface";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import dayjs from "dayjs";

interface ReportSharedVsTimeProps {
  reports: ReportDetails[];
}

const dateFormatter = (date: Date) => {
  return dayjs(date).format("DD/MM/YYYY");
  //   return format(new Date(date), "YYYY-MM-dd");
};

/**
 * get the dates between `startDate` and `endSate` with equal granularity
 */

const getTicks = (startDate: Date, endDate: Date, num: number) => {
  const sDate = dayjs(startDate);
  const eDate = dayjs(endDate);
  const diffMonths = sDate.diff(eDate, "month");

  let current = sDate,
    velocity = Math.round(diffMonths / (num - 1));

  const ticks = [sDate.toDate()];

  for (let i = 1; i < num - 1; i++) {
    ticks.push(current.add(i * velocity, "month").toDate());
    // ticks.push(add(current, { days: i * velocity }).getTime());
  }

  ticks.push(eDate.toDate());
  return ticks;
};

/**
 * Add data of the date in ticks,
 * if there is no data in that date in `data`.
 *
 * @param Array<number> _ticks
 * @param {*} data
 */
const fillTicksData = (_ticks, data) => {
  const ticks = [..._ticks];
  const filled = [];
  let currentTick = ticks.shift();
  let lastData = null;
  for (const it of data) {
    if (ticks.length && it.date > currentTick && lastData) {
      filled.push({ ...lastData, ...{ date: currentTick } });
      currentTick = ticks.shift();
    } else if (ticks.length && it.date === currentTick) {
      currentTick = ticks.shift();
    }

    filled.push(it);
    lastData = it;
  }

  return filled;
};

const ReportSharedVsTime = ({ reports }: ReportSharedVsTimeProps) => {
  //   console.log(dayjs(reports[0].updatedAt).format("DD/MM/YYYY"));
  const [graphData, setGraphData] = useState<
    { date: Date; noOfReports: number }[]
  >([]);
  const [ticks, setTicks] = useState<number[]>([]);

  //   console.log(dayjs().month(1).toDate());
  useEffect(() => {
    if (reports.length > 0) {
      const sortedReports = reports.sort(function (a, b) {
        return new Date(a.reportDate) - new Date(b.reportDate);
      });
      const ticks = getTicks(
        sortedReports[0].reportDate,
        sortedReports[sortedReports.length - 1].reportDate,
        3
      );
      setTicks(ticks);
      console.log(ticks);

      let currentMonth = dayjs(sortedReports[0].reportDate).get("month");
      const data: { date: Date; noOfReports: number }[] = [];
      data.push({ date: sortedReports[0].reportDate, noOfReports: 1 });
      sortedReports.forEach((report, index) => {
        if (index > 0) {
          if (dayjs(report.reportDate).get("month") === currentMonth) {
            data[data.length - 1].noOfReports =
              data[data.length - 1].noOfReports + 1;
          } else {
            currentMonth = dayjs(report.reportDate).get("month");
            data.push({ date: report.reportDate, noOfReports: 1 });
          }
        }
      });
      //   console.log(data);
      data.map((d) => {
        d.date = dayjs(d.date).format("MMM/YYYY");
      });
      setGraphData(data);
    }
  }, [reports]);
  //   console.log(sortedReports);
  //   const domain = [(dataMin) => dataMin, () => endDate.getTime()];
  //   const ticks = getTicks(startDate, endDate, 4);
  //   const filledData = fillTicksData(ticks, data);

  return (
    <div>
      <LineChart width={730} height={250} data={graphData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="noOfReports" />
        <Tooltip />
        <Line type="monotone" dataKey="noOfReports" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default ReportSharedVsTime;
