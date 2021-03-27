import { Button, Container, Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../components/context/AuthContext'
import LineDemo from '../../components/LineDemo'
import Alert from '@material-ui/lab/Alert'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import BuildIcon from '@material-ui/icons/Build';
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback';
import { AlertTitle } from '@material-ui/lab'
import VideoCallIcon from '@material-ui/icons/VideoCall';
import Machines from '../../components/Machines/Machines'
const MiddlePage = () => {

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }


    return (
      <>  
      
         
        <Container >
          <div>
            <div style={{display: "flex"}}>
              <Grid style={{marginTop: '30px'}} sm={4}>
               
                <Alert severity="info" variant="standard">
                  <AlertTitle>
                     Welcome Back ! <strong>{currentUser.email}</strong>
                  </AlertTitle>
                   
              </Alert>
             </Grid>
              <Button  startIcon={<PowerSettingsNewIcon/>} onClick={handleLogout} variant="contained" style={{width:"150px", color: "white" , backgroundColor: "#fa1e0e", marginLeft: "50%", height: "40px", marginTop: '30px'}}>Logout</Button>
             
            </div>
      
              <Grid > <br/>  </Grid>
          
             <Button startIcon={<BuildIcon/>} style={{backgroundColor: "blue",width:"150px", marginRight: "30px", marginTop: "3%"}} color="primary" variant="contained" href="/machine-data"> Machines</Button>
            <Button startIcon={<PersonIcon/>} style={{backgroundColor: "blue",width:"150px",marginRight: "30px", marginTop: "3%"}} color="primary" variant="contained" href="/account"> Account</Button>
            <Button startIcon={<GroupIcon/>} style={{backgroundColor: "blue",width:"150px",marginRight: "30px", marginTop: "3%"}} color="primary" variant="contained" href="/users"> Users</Button>
             <Button startIcon={<PhoneCallbackIcon/>} style={{backgroundColor: "blue",width:"150px",marginRight: "30px", marginTop: "3%"}} color="primary" variant="contained" href="/call-logs"> Call Logs</Button>
              <Button startIcon={<VideoCallIcon/>} style={{backgroundColor: "blue",width:"150px",marginRight: "30px", marginTop: "3%"}} color="primary" variant="contained" href="/videocall"> Video Call</Button>
            {error && <Alert severity="error">{error}</Alert>}
            <br/>
            <br/>
            </div>
            <LineDemo/>
        </Container>
        </>
    )
}

export default MiddlePage
