import { Container, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import LineDemo from '../../components/LineDemo';
import Sidebar from '../../components/Sidebar/Sidebar';
import {db} from '../../firebase'

export const Reports = ({match}) => {
  const [reportData, setReportData] = useState([])
  useEffect(() => {
    db.collection('machines').doc(match.params.id).get().then(snapshot => {
      const data = snapshot.data()
      setReportData(data)
    })
  })
  console.log(match)
  return (
  <>
  <Sidebar match={match}/>
    <div className="reports">
      <Typography variant="h5">{reportData.title}</Typography>
      <Typography variant="body2">({reportData.location})</Typography>
    </div>
    </>
  );
};





export const Process = ({match}) => {
  return (
    <>
    <Sidebar match={match}/>
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
      <Typography gutterBottom align="center" component="h1" variant="h4">ONGOING  PROCESSES</Typography>
      <Container xs><LineDemo/></Container>
    </div>
    </>
  );
};