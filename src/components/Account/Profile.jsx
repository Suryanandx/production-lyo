import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
  TextField
} from '@material-ui/core';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Pune, Maharashta',
  jobTitle: 'Senior Developer',
  name: 'Suryanand',
  timezone: 'IST'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({account, className, ...rest }) => {
  const classes = useStyles();
  
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
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
            {`${moment().format('hh:mm A')} ${user.timezone}`}
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
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;