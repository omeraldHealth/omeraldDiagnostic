
import { InputNumber, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { DatePicker } from 'antd';
import moment from 'moment';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
const { RangePicker } = DatePicker;
import 'chartjs-adapter-moment'
import axios from 'axios';
import { getDiagnosticReports } from '@utils';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
const ReportSharedVsTime2 = () =>{

    const [maxVal,setMaxVal] = useState(100)
    const [dateRange,setDateRange] = useState()
    const [date,setDate] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const diagnosticDetails = useSelector((state:any)=>state.diagnosticReducer)
    const [reportCount,setReportCount] = useState([])

    const fetchReports = async () => {return await axios.get(getDiagnosticReports +diagnosticDetails?.phoneNumber)}
    const {data:reports,isLoading:loading} = useQuery(["reports"],fetchReports)

    useEffect(()=>{
      const sixMonthsAgo = moment().subtract(6, 'months').toDate();
      const current = moment().toDate();
      initialLoad(sixMonthsAgo,current)
    },[reports])

    const initialLoad = (start,end)=>{
      const startDate = new Date(start);
      const endDate = new Date(end);
      const {monthYearArray,counts} = getMonthYearArray(startDate, endDate,reports?.data);

      setDate(monthYearArray);
      setReportCount(counts)
      setMaxVal(Math.max.apply(null, counts))
    }

    const generateDateRange =(data:any) =>{
      const startDate = new Date(data?.[0].$d);
      const endDate = new Date(data?.[1].$d);
      const {monthYearArray,counts} = getMonthYearArray(startDate, endDate,reports?.data);

      setDate(monthYearArray);
      setReportCount(counts)
      // setMaxVal(Math.max.apply(null, counts))
     
    }

    const  option = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Reports Shared Last 6 months'
          }
        },
        elements: {
          point:{
              radius: 1
          }
        },
        scales: {
          y: {
              beginAtZero: true,
              max: maxVal,
              min: 0
          },
           x: {
          type: 'time',
          time: {
            unit: 'month',
            displayFormats: {
              month: 'MMM YYYY',
            },
            tooltipFormat: 'MMM YYYY',
          },
          ticks: {
            source: 'labels',
            autoSkip: true,
            maxRotation: 0,
            minRotation: 0,
          },
        }}
    }

    const data = {
        labels: date,
 
        datasets: [
          {
            label: 'Reports Uploaded',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(49, 104, 212)',
            borderColor: 'rgb(49, 104, 212)',
            borderWidth: 2,
            data: reportCount,
          },
          {
            label: 'Reports Shared',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(214, 128, 6)',
            borderColor: 'rgb(214, 128, 6)',
            borderWidth: 2,
            data:[],
          }
        ]


    }

    const handleOnchange = (val:any)=>{
      setMaxVal(val)
    } 

    const handleOk = (val:any)=>{
      generateDateRange(dateRange)
      setIsModalOpen(false)
    } 

    const disabledDate = (current:any) => {
      return current && current < moment().subtract(6, 'months').endOf('day') || current > moment().endOf('day');;
    };

    return   <section className="sm:w-[65%] xl:w-[50%] h-[30vh] sm:h-auto bg-white p-2"> 
      <a href='#' onClick={()=>{setIsModalOpen(true)}}><span className='flex font-light text-sm justify-end text-red-700'>Choose Range <PencilSquareIcon className='w-4 mx-2' /></span></a>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleOk}>
        <div className='my-2'>
          <p className='my-2'>Enter Range of report count (Between 0 to 1000)</p>
          <InputNumber min={1} max={1000} defaultValue={100} onChange={handleOnchange} />
          </div>
         
        <div className='my-2'> 
           <p className='my-2'>Choose Date range (6 months range)</p>
          <RangePicker onChange={(date:any)=>{setDateRange(date)}} disabledDate={disabledDate} picker="month" /></div>
      </Modal>
    
      <Bar 
        data={data}
        options={option}
        className="w-[100vw]"
      />
    </section>
}

export default ReportSharedVsTime2

function getMonthYearArray(startDate, endDate,data) {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();
  const yearDifference = endYear - startYear;
  const monthDifference = (yearDifference * 12) + (endMonth - startMonth);
  const monthYearArray = [];

  for (let i = 0; i <= monthDifference; i++) {
    const monthYear = new Date(startYear, startMonth + i, 1).toLocaleString('default', { month: 'long', year: 'numeric' });
    monthYearArray.push(monthYear);
  }

  const counts = [];

  for (let i = 0; i <= monthDifference; i++) {
    // const countObj = {
    //   // month: new Date(startYear, startMonth + i, 1).toLocaleString('default', { month: 'long', year: 'numeric' }), 
    //   count: 0
    // };
    let count = 0;
    if(data){
      for (let j = 0; j < data?.length; j++) {
        const itemDate = new Date(data[j].reportDate);
        if (itemDate.getFullYear() === (startYear + Math.floor((startMonth + i) / 12))) {
          if (itemDate.getMonth() === (startMonth + i) % 12) {
            count++;
          }
        }
      }
  
      counts.push(count)
    }

  }

  return {monthYearArray,counts};
}