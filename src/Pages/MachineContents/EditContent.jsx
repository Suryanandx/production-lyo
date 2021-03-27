import { Button, Container, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'

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
  submit: {
      background: "#141256",
      borderRadius: '20px',
      margin: theme.spacing(3, 0, 2),
  }
}));





const EditContent = () => {

  const [content_name, setContentName] = useState('')
  const [content_description, setContentDescription] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

    const handleSubmit = (e, id) => {
    
    const content = {content_name, content_description, createdAt};
    setLoading(true);
    fetch(`http://localhost:5000/content/${id}`, {
      method: 'PUT',
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(content)
    }).then((res) => {
        res.json()
      setLoading(false)
      history.go(-1)
    })
  }



  const classes= useStyles();
    return (
        <Container maxWidth="xs" component="main">
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
          Edit Content
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
          value={content_name}
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
          value={content_description}
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
            id="date"
            label="Created At"
            type="date"
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
            Update
            </Button>}
         {
           loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled
            className={classes.submit}
          >Updating values...</Button>
         }   
          </form>
          </div>
        </Container>
    )
}

export default EditContent
