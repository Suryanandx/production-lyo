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
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
    backgroundColor: '#141256',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button_submit: {
      background:'#141256',
      borderRadius: '20px',
      margin: theme.spacing(3, 0, 2),
  }
}));

export default function ForgotPass() {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  

    async function handleSubmit(e) {
        e.preventDefault()

        try {
        setMessage("")
        setError("")
        setLoading(true)
        await resetPassword(email)
        setMessage("Check your inbox for further instructions")
        } catch {
        setError("Failed to reset password")
        }

        setLoading(false)
    }
  return (
      <>
     <img src="./" alt=""/>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          
        </Avatar> 
       
        <Typography component="h1" variant="h5">
          Forgot Password?
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="success">{message}</Alert>}
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
          value={email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
           onChange={(e) => setEmail(e.target.value)}
           
          />
    
          <Button
          disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button_submit}
          >
           Reset
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/login" variant="body2">
                Back to LogIn?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </>
  );
}