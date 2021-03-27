import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import StepItem from './StepItem';
import {Link, useHistory} from 'react-router-dom';
import {db, storageRef } from '../../firebase'
import { firebaseLooper } from '../../utils/tools';
import Sidebar from '../../components/Sidebar/Sidebar';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Page from '../../components/Page';
const useStyles = makeStyles((theme) =>( {
    add: {
     
    background:'#141256',
    borderRadius: '20px',
    margin: theme.spacing(3, 0, 2),
 
    },
    backButton: {
        backgroundColor: "#A997DF",
        color: "white",
        borderRadius: "20px",
        marginRight: "30px",
        marginLeft: "20px",
    },
}))


    

const Steps = ({match}) => {
    const classes = useStyles();
    const history=useHistory()
    const [steps, setSteps] = useState([{}])

    const handleReturn = () => {
        history.go(-1)
    }
    useEffect(() => {
        
        db.collection('steps').where('cid', '==', `${match.params.id}`).get().then((snapshot) => {
            const stepData = firebaseLooper(snapshot)
            setSteps(stepData)
            console.log(stepData)
        })

    }, [])
    
   

    return (
        <Page title="Steps">
           <Button startIcon={<ArrowBackIcon/>} onClick={handleReturn} variant="contained" className={classes.backButton} >Go back</Button>
             <Button
             startIcon={<AddIcon/>} 
            variant="contained"
            color="primary" className={classes.add}>
               <Link style={{color: "white" ,textDecoration: "none"}} to={`/steps/${match.params.id}/add-step`}>
                    Add Step
               </Link>
               </Button>
            {
                steps.map((data) => (
                    <StepItem key={data.id} data={data} />
                ))
            }
        </Page>
    )
}

export default Steps