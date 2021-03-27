import { Button, Container, InputLabel, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import {useDropzone} from 'react-dropzone';
import {db, storageRef} from '../../firebase'
import { DropzoneArea } from 'material-ui-dropzone';
import Alert from '@material-ui/lab/Alert';
import { v4 as uuid } from 'uuid'
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
    width:"1000px",
    marginTop: theme.spacing(1),
  },
  submit: {
    maxWidth: "650px",
      background: "#4a47a3",
      borderRadius: '20px',
      margin: theme.spacing(3, 0, 2),
  },
  drag: {
  width: "500px",
  height: "200px",
  border: "4px dashed #fff",
  },
  drop: {
    textAlign: "center",
    color: "#4a47a3",
    fontFamily: "roboto"
  },
  backButton: {
      margiinTop: "30px",
        backgroundColor: "#A997DF",
        color: "white",
        borderRadius: "20px",
        marginRight: "30px",
        marginLeft: "20px",
    },
}));


const AddSteps = ({match}) => {

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('');
  const [createdAt, setCreatedAt] = useState('');
   const [uniqueKey, setUniqueKey] = useState(uuid());
  const [cid, setCid] = useState(match.params.id)
  const [media, setMedia] = useState({
    mediaData: null ,
    url: "",
  })
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('')
  
  const history = useHistory();
  const handleReturn = () => {
    history.go(-1)
  }

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log(media)
     storageRef
     .child(`/media/steps/${uniqueKey}/${media.mediaData[0].name}`)
     .put(media.mediaData[0]).snapshot.ref.getDownloadURL().then((durl) => {
       setMedia({url: durl})
       console.log(durl)
     })
   
    const link = media.mediaData[0].name
    const steps = {title, desc, createdAt, cid, link, uniqueKey };
    setLoading(true);
    db.collection('steps').add(steps).then(()=>{
      setLoading(false)
      setMessage('Step Added successfully !')
      history.go(-1)
    })
  }

  
 

  const classes= useStyles();
    return (
      <>
       <Button onClick={handleReturn} variant="contained" className={classes.backButton} >Go back</Button>
        <Container maxWidth="xs" component="main">
          <div className={classes.paper}>
            <Alert severity="info">You are currently Adding New Steps</Alert>
            <br/>
            <Typography component="h1" variant="h4">
          Add  Step
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div style={{display: 'flex'}}>
          <div style={{marginRight: "50px"}} >
          <TextField
          label="Content id"
           value={cid}
          variant='outlined'
          margin='normal'
          fullWidth
          disabled
          onChange={(e) => setCid(e.target.value)}
          />
          <TextField
          value={title}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Step Title"
            name="title"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
          value={desc}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            rows={7}
            name="step_description"
            label="Description"
            onChange={(e) => setDesc(e.target.value)}
            id="step_description"
            multiline
            
          />
           <TextField
           value={uniqueKey}
           variant="outlined"
            id="date"
            label="unique id"
            disabled
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
    </div>
    <div>
      <Alert severity="warning">Don't leave Media Field empty !</Alert>
      <br/>
       <InputLabel variant="contained">Add Media</InputLabel>
       <DropzoneArea
       dropzoneClass={classes.drop}
        acceptedFiles={['image/*', 'video/*', 'application/*']}
       onChange={(files) => setMedia({mediaData: files})}
        showFileNames
        dropzoneText="Drag and Drop / Click to ADD Media"
        showAlerts={false}
        filesLimit={1}
      />
     </div>
     </div>

         {!loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Step
            </Button>}
         {
           loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled
            className={classes.submit}
          >Adding Step...</Button>
         }   
          </form>
          </div>
        </Container>
        </>
    )
}

export default AddSteps
