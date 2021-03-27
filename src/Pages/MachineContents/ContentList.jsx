import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { firebaseLooper } from '../../utils/tools';
import ContentItem from './ContentItem';
import {db} from '../../firebase'

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottomColor: "black",
    backgroundColor: theme.palette.background.dark,
   
  },
}));


const ContentList = ({key, content}) => {

  const classes = useStyles();
  const handleData = (machine) => (
        machine? 
        machine.map((data, i) =>(
            <div key={i}>
                <ContentItem content={data}/>
         
            </div>
        ))
        :null
    )
    return (
    <Container className={classes.root} >
        {handleData(machines)}
    </Container>
    )
}

export default ContentList
