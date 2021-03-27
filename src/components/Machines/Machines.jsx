import { Button, CircularProgress, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import MachineList from './MachineList';
import {Link} from 'react-router-dom';
import Machine from './Machine';
import {db} from '../../firebase';
import {firebaseLooper} from '../../utils/tools'
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Page from '../Page';
const useStyles = makeStyles((theme) =>( {
    add: {
    background:'#141256',
    borderRadius: '20px',
    margin: theme.spacing(3, 0, 2),
    },
   backButton: {
        backgroundColor: "#A997DF",
        width: "100px",
        color: "white",
        borderRadius: "20px",
        marginRight: "30px",
        marginLeft: "20px",
    },
}))
const Machines = () => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [machines, setMachines] = useState([{}]);
    const [error, setError] = useState(null)
    
    useEffect(() => {

        db.collection('machines').get().then(snapshot => {
            const machine = firebaseLooper(snapshot);
            setMachines(machine)
            setIsLoading(false);
            console.log(machine)
            
        }).catch(err => {
            setIsLoading(false)
            setError(err.message);
            console.log(err)
        })
     
    }, [])


  
    return (
        <Page title="Machines">
        <Container maxWidth>
                    <Button startIcon={<HomeIcon/>} href="/" className={classes.backButton}>Home</Button>
                {error && <Typography variant="h6">{error}</Typography>}
               
                <Button
                startIcon={<AddIcon/>} 
                    variant="contained"
                    color="primary" className={classes.add}>
                    <Link style={{color: "white" ,textDecoration: "none"}} to="/add-machine">
                            Add Machine
                    </Link>
                    </Button>
                     {isLoading && <Typography variant="h3">
                    Loading...<CircularProgress size={50}/> 
                    </Typography>}
                            {
                        machines.map((data) => (
                                    <Machine style={{height: "100%"}} key={data.id} data={data}/> 
                        ))
                
                }
                    
                    
                
                </Container>

        </Page>
       
    )
}

export default Machines
