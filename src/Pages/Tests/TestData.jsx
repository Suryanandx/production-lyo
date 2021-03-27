import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2";

const TestData = ({ data}) => {
  let time = []
  let temp = []
  let stillTime = []
  let pressure = []
  let delta =  []
  let deltaP =[]
  const [timeData, setTimeData] = useState([])
  const [stillTimeData, setStillTimeData] = useState([])
  const [tempData, setTempData] = useState([])
  const [pressureData, setPressureData] = useState([])
  const [deltaData, setDeltaData] = useState([])
  const [deltaDataPressure, setDeltaDataPressure] = useState([])

  useEffect(() => {
      var x, y, z;
      var randomTemp;
      let currTemp=25; let currPressure= 800; let currTime = 0;
    for (let index = 0; index < data.length; index++) {
      x = (data[index].temp1 - currTemp)/data[index].time1
      y = (data[index].pressure - currPressure)/data[index].time1
     
      for (let j = 0; j < data[index].time1 ; j++) {
          currTime++;
          currTemp = currTemp + x;
        
          currPressure = currPressure + y
          time.push(currTime)
          temp.push(currTemp)
          pressure.push(currPressure)
          
          
      }

      for (let k = 0; k < data[index].time2; k++) {
          currTime++
          time.push(currTime)
          temp.push(currTemp)
          pressure.push(currPressure)
         
          
      }
    }
  setTimeData(time)
  setTempData(temp)
  setStillTimeData(stillTime)
  setPressureData(pressure)
  setDeltaData(delta)
  setDeltaDataPressure(deltaP)
  })
  console.log(timeData)

const dataTwo = {
  labels: timeData,
  datasets: [
    {
      label: 'Temprature',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#b8b5ff',
      borderColor: '#b8b5ff',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#b8b5ff',
      pointBackgroundColor: '#b8b5ff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#b8b5ff',
      pointHoverBorderColor: '#7868e6',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: tempData
    },
  ]
};

const dataOne = {
  labels: timeData,
  datasets: [
    {
      label: 'Pressure',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#f14668',
      borderColor: '#f14668',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#fa1e0e',
      pointBackgroundColor: '#fa1e0e',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#fa1e0e',
      pointHoverBorderColor: '#7868e6',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: pressureData
    }
  ]
};

    return (
        <Container>
        <Line data={dataTwo}/>
        <Line data={dataOne}/>
        </Container>
    )
}

export default TestData
