
import { Button, Grid, makeStyles } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';
import ContentDataBox from './ContentDataBox';
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
const ContentsData = ({match}) => {
    const [content, setContent] = useState([{}])
    const history = useHistory()
   const classes = useStyles()
    useEffect (() => {
        db.collection('contents')
        .where('mid' , '==' , `${match.params.id}`)
        .get()
        .then(snapshot => {
            const data = firebaseLooper(snapshot)
            setContent(data)
            console.log(data)
        })
    });
   const handleReturn=() => {
       history.push('/machine-data')
   }
    return (
        <Page
        title="Content"
        >

            <Sidebar match={match}/>
            <Button startIcon={<ArrowBackIcon/>} onClick={handleReturn} variant="contained" className={classes.backButton}>Go back</Button>
           <Button
           startIcon={<AddIcon/>}
           className={classes.add} 
            variant="contained"
            color="primary" >
               <Link style={{color: "white" ,textDecoration: "none"}} to={`/machine-data/${match.params.id}/Content/add-content`}>
                   Add Content
               </Link>
               </Button>
            <br/>
            {content.map((data) => (
                <ContentDataBox key={data.id} data={data}/>
            ))}
            
        </Page>
    )
}

export default ContentsData
