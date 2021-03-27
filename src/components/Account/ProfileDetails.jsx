import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { db } from '../../firebase';
import { useAuth } from '../context/AuthContext';
import { firebaseLooper } from '../../utils/tools';

const states = [
  {
    value: 'maharashtra',
    label: 'Maharashtra'
  },
  {
    value: 'karnataka',
    label: 'Karnataka'
  },
  {
    value: 'kerala',
    label: 'Kerala'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ accountb , className }) => {
  
  const classes = useStyles();
  const {currentUser} = useAuth()
  const [values, setValues] = useState({ });
 
  const [lastName, setLastName] = useState(accountb.lastName)
  const [account, setAccount] = useState([])

  useEffect(() => {
    db.collection('users').where('email', '==', currentUser.email ).get().then(snapshot => {
      const accountData = firebaseLooper(snapshot)
      setAccount(accountData[0])
      
    })
  })
   const [firstName, setFirstName] = useState(account.firstName)

  return (
    <form
     
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
              label="First name"
              value={firstName}
                fullWidth
                helperText="Please specify the first name"
                variant="outlined"
                required
                />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                required
                value={lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                disabled
                required
                value={currentUser.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                type="number"
                value={accountb.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Password"
                
               disabled
                required
                value={currentUser.password}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select State"
                name="state"
                
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
          type="submit"
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;