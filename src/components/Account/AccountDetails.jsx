import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Container,
  Typography,
  CardActions,
  Avatar
} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { firebaseLooper } from '../../utils/tools'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from "react-router-dom"
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  root: {
      width: "50%",
      marginLeft: "5%"
  },
  avatar: {
    height: 100,
    width: 100
  }
}));

const AccountDetails = () => {

   const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
    const [account, setAccount] = useState([])
     const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const classes = useStyles();
    const history = useHistory()

     useEffect(() => {
    db.collection('users').where('email', '==', currentUser.email ).get().then(snapshot => {
      const accountData = firebaseLooper(snapshot)
      setAccount(accountData[0])
      
    })
  })

 async function handleSubmit(e) {
        e.preventDefault()
    if (password !== passwordConfirm) {
      return setError("Passwords do not match! Please try again")
    }

      if (password.length <= 8){
      return setError("Weak Password !")
    }

    if (email !== currentUser.email) {
     updateEmail(email)
     history.push('/')
    }
    setLoading(true)
    setError("")

    
    try {
      await  updatePassword(password)
       history.push("/")
    } catch (error) {
        setError("Failed to create an account")
    }

    
  }


    return (
        <Container style={{display: "flex", marginTop: "5%"}}>
           <Card >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
           {` ${account.firstName} ${account.lastName}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {account.role}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
      <Divider />
      <CardActions>
      </CardActions>
    </Card>
    
    {/* Details */}
        <form className={classes.root} onSubmit={handleSubmit}>
     <Card >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        
        <Divider />
        <CardContent>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                required
                value={currentUser.email}
                variant="outlined"
                style={{marginBottom: "5%"}}
                onChange={(e) => setEmail(e.target.value)}
              />
            
              <TextField
                fullWidth
                label="Password"
                helperText="Create a new password for the account!"
                value={password}
                required
                type="password"
                variant="outlined"
                 style={{marginBottom: "5%"}}
                onChange={(e) => setPassword(e.target.value)}
              />

              <TextField
                fullWidth
                label="Re-enter Password"
                value={passwordConfirm}
                type="password"
                required
                style={{marginBottom: "5%"}}
                variant="outlined"
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              
              {error && <Alert severity="error">{error}</Alert>}
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          >
            Save details
          </Button>

           <Button
        style={{width: "100px", marginLeft: "5%"}}
          color="secondary"
          variant="contained"
          href="/"
          >
            Cancel
          </Button>
        </Box>
      </Card>
      </form>
        </Container>
    )
}

export default AccountDetails
