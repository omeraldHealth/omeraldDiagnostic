
import { Line } from 'react-chartjs-2';

const ReportSharedVsTime2 = () =>{

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
              max: 250,
              min: 0
          },
      }
    }

    const data = {
        labels: ['July','August','Sept','Oct','Nov','Dec'],
        datasets: [
          {
            label: 'Reports Uploaded',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(49, 104, 212)',
            borderColor: 'rgb(49, 104, 212)',
            borderWidth: 2,
            data: [],
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

    return <>
      <Line 
        data={data}
        options={option}
      />
    </>
}

export default ReportSharedVsTime2