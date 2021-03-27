import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar';
import BatchLogList from './BatchLogList';



const useStyles = makeStyles((theme) =>( {
    add: {
     
    background:'#141256',
    borderRadius: '20px',
    margin: theme.spacing(3, 0, 2),
 
    }
}))
const BatchLogs = ({match}) => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [batch, setBatch] = useState(null);
    const [error, setError] = useState(null)
    useEffect(() => {
        database.ref('recipes/' ).get().then((snapshot) => {
            const data = firebaseLooperTwo(snapshot)
            console.log(data)
            setBatch(data)           
        })
    }, [])
    return (
        <>
        <Sidebar match={match}/>
        {error && <Typography variant="h6">{error}</Typography>}
        {isLoading && <Typography variant="h3">Loading...</Typography>}
          {batch && <BatchLogList batch={batch} />}
        </>
    )
}

export default BatchLogs;