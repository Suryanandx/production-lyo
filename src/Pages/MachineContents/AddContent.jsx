import { Button, Container, makeStyles, TextField, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import  {db} from '../../firebase'
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
    alignItems: "center",
    justifyContent: "center",
    width: '900px', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
      background: "#4a47a3",
      borderRadius: '20px',
      margin: theme.spacing(3, 0, 2),
  },
  backButton: {
      marginTop: "30px",
        backgroundColor: "#A997DF",
        color: "white",
        borderRadius: "20px",
        marginRight: "30px",
        marginLeft: "20px",
    },
}));





const AddContent = ({match}) => {
  const classes= useStyles();
  const [title, setContentName] = useState('')
  const [desc, setContentDescription] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [mid, setMid] = useState(match.params.id)
  const history = useHistory();

    
    const handleSubmit = (e) => {
    e.preventDefault();
    const content = {title, desc, mid, createdAt};
    setLoading(true);
      db.collection('contents').add(content).then((data) =>{
        console.log(data)
        history.go(-1)
      })

  }
  
    return (
      <>
        <Container maxWidth="xs" component="main">
          
          <div className={classes.paper}>
            <Alert severity="info">You are currently adding new Contents</Alert>
            <br/>
            <Typography component="h1" variant="h4">
          Add Content
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField value={mid}
           fullWidth
           variant="outlined"
           margin="normal"
           label="Machine id"
           disabled
           onChange ={(e) => setMid(e.target.value)}
           />
          <TextField
          value={title}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="content_name"
            label="Content Name"
            name="content_name"
            autoFocus
            onChange={(e) => setContentName(e.target.value)}
          />
          <TextField
          rows={8}
          value={desc}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="content_description"
            label="Description"
            onChange={(e) => setContentDescription(e.target.value)}
            id="content_description"
            multiline
            
          />
          <TextField
           value={createdAt}
           variant="outlined"
            id="date"
            label="Created At"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
           
          
         {!loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Content
            </Button>}
         {
           loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled
            className={classes.submit}
          >Adding Content...</Button>
         }   
          </form>
          </div>
        </Container>
        </>
    )
}

export default AddContent
