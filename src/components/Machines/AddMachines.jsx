import { Button, Container, makeStyles, TextField, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import {db} from '../../firebase'
import {firebaseLooper} from '../../utils/tools'
import { useAuth } from '../context/AuthContext';
import faker from 'faker'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#141256',
  },
  form: {
    width: '900px', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
      background: "#141256",
      borderRadius: '20px',
      margin: theme.spacing(3, 0, 2),
  }
}));

const AddMachines = () => {
  const { currentUser } = useAuth()
  const [title, setMachineName] = useState('')
  const [location, setMachineLocation] = useState('');
  const [createdBy, setCreatedBy] = useState(currentUser.email);
  const [loading, setLoading] = useState(false);
  
  const history = useHistory();

    const handleSubmit = (e) => {
     
    e.preventDefault();
    var result = {title,location,createdBy }
        db.collection('machines').add(result).then(data => {
          history.push('/machine-data')
          console.log(data)
        })
    }



  const classes= useStyles();
    return (
        <Container maxWidth="xs" xs={12} component="main">
          <Container className={classes.paper}>
            <Alert severity="info">You are currently adding a new Machine</Alert>
            <br/>
            <Typography component="h1" variant="h4">
          Add Machine
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
          value={title}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="machine_name"
            label="Machine Name"
            name="machine_name"
            autoFocus
            onChange={(e) => setMachineName(e.target.value)}
          />
          <TextField
          value={location}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="location"
            label="Location"
            onChange={(e) => setMachineLocation(e.target.value)}
            id="machine_location"
            style={{marginBottom:"20px"}}
          />
          
           <TextField
           fullWidth
           value={createdBy}
           variant="outlined"
            id="user"
            label="Created By"
            type="text"
            disabled
            onChange ={(e) => setCreatedBy(e.target.value)}
           
          />
          
         {!loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add  Machine
            </Button>}
         {
           loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled
            className={classes.submit}
          >Adding Machine...</Button>
         }   
          </form>
          </Container>
        </Container>
    )
}

export default AddMachines
