import React, { useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { InputLabel, Select } from '@material-ui/core';
import { useAuth } from "../context/AuthContext"
import {db} from '../../firebase'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Arizon Systems Pvt Ltd.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor:"#141256",
  },
  form: {
    width: '700px', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background:'#141256',
    borderRadius: '20px',
  },
}));

export default function AddUser() {
  const emailRef = useRef()
  const passwordRef= useRef()
  const passwordConfirmRef = useRef()
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [loading, setLoading] = useState();
  const classes = useStyles();
  const history = useHistory()
  const { signup } = useAuth()

  const handleReturn = () => {
      history.push('/users')
  }
   async function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirmPass) {
      return setError("Passwords do not match")
    }
    if (password.length <= 8){
      return setError("Weak Password !")
    }

    const userData = {firstName, lastName, email, password, phone, role, username}
    try {
      setError("")
      setLoading(true)
      await signup(email, password)
      db.collection('users').add(userData)
      history.push("/")
    
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
    <Button style={{
        backgroundColor: "#A997DF",
        color: "white",
        borderRadius: "20px",
        marginTop: "30px",
        marginRight: "30px",
        marginLeft: "20px",
    }}
    onClick={handleReturn}
    >Go back</Button>
    <Container component="main" maxWidth="xs">
      
      <CssBaseline />
      <div className={classes.paper}>
        <Alert severity="info">You are currently adding a new authenticated user!</Alert>
        <Avatar className={classes.avatar}>
          
        </Avatar>
        <Typography component="h1" variant="h4">
          Create User
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
              value={firstName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              value={lastName}
              fullWidth
                variant="outlined"
                required
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              value={email}
                variant="outlined"
                required
                fullWidth
                id="email"
                ref={emailRef}
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
             <Grid item xs={12}>
              <TextField
              value={username}
                variant="outlined"
                required
                fullWidth
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              value={phone}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Phone Number"
                type="Number"
                id="phone"
                autoComplete="current-password"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              value={password}
                variant="outlined"
                required
                fullWidth
                helperText="Password must have atleast 8 characters"
                ref={passwordRef}
                id="password"
                label="Password"
                name="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              value={confirmPass}
                variant="outlined"
                required
                fullWidth
                ref={passwordConfirmRef}
                name="password"
                label="Re-enter Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel color="secondary" variant="outlined">Role</InputLabel>
        <Select
        fullWidth
        variant="outlined"
          native
          value={role}
          required
          onChange={(e)=> setRole(e.target.value)}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value="Admin">Admin</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Manager">Manager</option>
        </Select>
            </Grid>
            
          </Grid>
          {!loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           Create
            </Button>}
         {
           loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled
            className={classes.submit}
          >Creating user....</Button> &&<Alert severity="success">User Added Successfully!</Alert>
         }   
         
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </>
  );
}
