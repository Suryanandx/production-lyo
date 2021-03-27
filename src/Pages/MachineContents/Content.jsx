import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import ContentItem from './ContentItem';
import {Link, useHistory} from 'react-router-dom';
import {db} from '../../firebase'
import { firebaseLooper } from '../../utils/tools';
const useStyles = makeStyles((theme) =>( {
    add: {
     
    background:'#141256',
    borderRadius: '20px',
    margin: theme.spacing(3, 0, 2),
    marginLeft: "20px"
 
    }
}))
const Content = ({match}) => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState([{
        contents: [],
        content1: {}
        
    }]);
    const [error, setError] = useState(null)
    
        
     useEffect (() => {
       db.collection('machines').doc(match.params.id).get().then((snapshot) => {
             const contentData = snapshot.data()
             setContent(contentData)        
       });
        
       
    })  
    
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [title, setContentName] = useState()
    const [desc, setContentDescription] = useState();
    const [createdAt, setCreatedAt] = useState();
   const [loading, setLoading] = useState(false);
   
    const history = useHistory();

    const handleEdit = () => {
      setOpenEdit(true)
    }
    const handleEditClose = () => {
      setOpenEdit(false)
    }

    const handleClickOpen = () => {
    setOpen(true);
  };

   const handleClose = () => {
    setOpen(false);
  };

  const updateContent=(id) => {
    setLoading(true)

    const data = {title,desc,createdAt}
      fetch(`http://localhost:5000/content/${id}`,{
        method: 'PUT',
         headers: {
         'Accept': 'application/json',
         "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then((res) => {
        res.json().then((resp) => {
        setLoading(false)
        window.location.reload()
        history.push('/machine-content')
        })
       })
  }
    return (
        <div>
        {error && <Typography variant="h6">{error}</Typography>}
        {isLoading && <Typography variant="h3">Loading...</Typography>}
           <Button 
            variant="contained"
            color="primary" className={classes.add}>
               <Link style={{color: "white" ,textDecoration: "none"}} to="/add-content">
                   Add Content
               </Link>
               </Button>
               <Typography variant="h1">{content.title}</Typography>
          <ContentItem content={content} />
                    
        </div>
    )
}

export default Content