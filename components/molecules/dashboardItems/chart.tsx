
import { InputNumber, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { Bar} from 'react-chartjs-2';
import { DatePicker } from 'antd';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import { getDiagnosticReports } from '@utils';
import 'chartjs-adapter-moment'
import moment from 'moment';
import { useAuthContext } from 'utils/context/auth.context';
import { useQueryGetData } from 'utils/reactQuery';

const { RangePicker } = DatePicker;

const ReportSharedVsTime2 = () =>{

    const [maxVal,setMaxVal] = useState(20)
    const [dateRange,setDateRange] = useState()
    const [date,setDate] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reportCount,setReportCount] = useState([])
    const {diagnosticDetails,activeBranch} = useAuthContext();
    const {data:reports,isLoading:loading} = useQueryGetData("getReports",getDiagnosticReports+diagnosticDetails?.phoneNumber)

    const reportsList = reports?.data?.filter((report:any) => report?.branchId === activeBranch?._id )

    useEffect(()=>{

        const sixMonthsAgo = moment().subtract(6, 'months').toDate();
        const current = moment().toDate();
        initialLoad(sixMonthsAgo,current)
        setMaxVal(reportsList?.length || 0)
    },[activeBranch])

    const initialLoad = (start:any,end:any)=>{
      const startDate = new Date(start);
      const endDate = new Date(end);
      const {monthYearArray,counts} = getMonthYearArray(startDate, endDate,reportsList);

      setDate(monthYearArray);
      setReportCount(counts)
      setMaxVal(Math.max.apply(null, counts))
    }

    const generateDateRange =(data:any) =>{
      const startDate = new Date(data?.[0].$d);
      const endDate = new Date(data?.[1].$d);
      const {monthYearArray,counts} = getMonthYearArray(startDate, endDate,reportsList);

      setDate(monthYearArray);
      setReportCount(counts)
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

    const handleCancel = (val:any)=>{
      const sixMonthsAgo = moment().subtract(6, 'months').toDate();
      const current = moment().toDate();
      initialLoad(sixMonthsAgo,current)
      setMaxVal(reports?.length || 2)
      setIsModalOpen(false)
    } 

    const disabledDate = (current:any) => {
      return current && current < moment().subtract(6, 'months').endOf('day') || current > moment().endOf('day');;
    };

    return (  
    <section className="sm:w-[65%] xl:w-[50%] h-[30vh] sm:h-auto bg-white p-2 shadow-xl"> 
      <a href='#' onClick={()=>{setIsModalOpen(true)}}><span className='flex font-light text-sm justify-end text-red-700'>Choose Range <PencilSquareIcon className='w-4 mx-2' /></span></a>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
    )
}

export default ReportSharedVsTime2

function getMonthYearArray(startDate:any, endDate:any,data:any) {
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