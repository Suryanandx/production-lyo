
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import {Link } from "react-router-dom";
import { Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex"
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    
  },
  link : {
      color: "blue",
      textDecoration: "none"
  }
  
}));

export default function MachineList({machines}) {
  const classes = useStyles();

  return (
      <>
      
    <div className={classes.root}>
        
        {machines.map((machines) => (
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h3">
                  {machines.machine_name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {machines.machine_location}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {machines.createdAt}
                </Typography>
              </Grid>
              <Grid item>
                <Typography  variant="body2" style={{ cursor: 'pointer' }}>
                  <Link className={classes.link} to="/reports">Open</Link>
                </Typography>
                
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="body2">{machines.id}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      ))}
    </div>
    </>
  );
}
