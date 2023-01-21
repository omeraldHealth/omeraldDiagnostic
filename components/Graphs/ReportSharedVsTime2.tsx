
import { Line } from 'react-chartjs-2';

const ReportSharedVsTime2 = () =>{

    const  option = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Reports Shared / Month (2022)'
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
            data: [10, 45, 140, 81, 206,120],
          },
          {
            label: 'Reports Shared',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(214, 128, 6)',
            borderColor: 'rgb(214, 128, 6)',
            borderWidth: 2,
            data:[26, 42, 165, 87, 186,100],
            borderDash: [10,10]

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