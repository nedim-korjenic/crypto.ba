import React, { useCallback, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import SelectButton from './SelectButton';
import { chartDays } from '../config/data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartInfo({coin}) {

const [chartData, setChartData] = useState()
const {currency, symbol} = CryptoState()
const [days, setDays] = useState(1)

const fetchData =useCallback( async() => {
  const {data} = await axios.get(HistoricalChart(coin?.id, days, currency))
  setChartData(data.prices)
}, [coin?.id, days, currency])

useEffect(()=> {
  fetchData()
}, [fetchData, currency])

console.log(chartData)

  const options = {
    elements: {
      point: {
        radius: 1,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Prices of ' + coin?.name,
      },
    },
  };
  
const labels = chartData?.map((coin) => {
  let date = new Date(coin[0])
  let time = date.getHours>12?
  `${date.getHours()-12}:${date.getMinutes()}`:
  `${date.getHours()}:${date.getMinutes()}`
return days===1? time : date.toLocaleDateString()
})
  
const data = {
    labels,
    datasets: [
      {
        label: coin?.name,
        data: chartData?.map((coin)=> coin[1]),
        borderColor: 'gold',
        backgroundColor:'gold'
      },
    ],
  };

  return (
    <>
    <div style={{width:'85vw', display:'flex',marginLeft:'2rem', padding:'0px'}}><Line style={{heigh:'80vh', marginBottom:'40px', backgroundColor:'#14161a', width:'80vw'}} options={options} data={data}/></div>
  <div style={{margin:'20px', display:'flex', justifyContent:'center', alignItems:'center'}}>
  {chartDays?.map((day) => (
                <SelectButton 
                  key={day?.value}
                  onClick={() => {setDays(day?.value);
                  }}
                  selected={day?.value === days}
                >
                  {day?.label}
                </SelectButton>
              ))}
  </div>
  </>)
}
