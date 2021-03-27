import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import UserItem from './UserItem';

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottomColor: "black",
    backgroundColor: theme.palette.background.dark,
   
  },
}));


const UserList = ({ users}) => {

    const classes = useStyles();
    return (
    <Container className={classes.root} >
      
        {users.map((users) => (
         
          <UserItem key={users.id} users={users}/>
          
        ))}
        
    </Container>
    )
}

export default UserList
