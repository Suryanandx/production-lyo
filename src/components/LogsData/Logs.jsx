import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from '../Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import Sidebar from '../Sidebar/Sidebar';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  backButton: {
        backgroundColor: "#A997DF",
        width: "100px",
        color: "white",
        borderRadius: "20px",
        marginRight: "30px",
        marginLeft: "20px",
        marginTop: "30px"
    },

}));

const CustomerListView = ({match}) => {
  console.log(match)
  const classes = useStyles();
  const [customers] = useState(data);

  return (
    <>
  <Button startIcon={<HomeIcon/>} href="/" className={classes.backButton}>Home</Button>
    <Page
      className={classes.root}
      title="Call Logs"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results match={match} customers={customers} />
        </Box>
      </Container>
    </Page>
    </>
  );
};

export default CustomerListView;