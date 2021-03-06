import React from 'react';
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import Page from '../../components/Page';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const NotFoundView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="404"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h2"
          >
            404: The page you are looking for isn’t here
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle2"
          >
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Box style={{marginLeft: "10%",display: "flex", flexDirection: "column"}} textAlign="center">
            <img
              alt="Under development"
              className={classes.image}
              src="https://yoast.com/app/uploads/2015/08/404_error_checking_FI.png"
            />
             <Button variant="contained" color="primary" href='/' style={{marginLeft: "20%",width: "20%", marginTop: "5%"}}>Re Route</Button>
          </Box>
         
        </Container>
      </Box>
    </Page>
  );
};

export default NotFoundView;