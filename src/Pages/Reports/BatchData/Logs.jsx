import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';
import Page from '../../../components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { database } from '../../../firebase';
import { firebaseLooperTwo } from '../../../utils/tools';
import Head from './Head';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const BatchListView = ({match}) => {
  console.log(match)
  const classes = useStyles();
  const [customers] = useState(data);
  const [batch, setBatch] = useState([]);

  useEffect(() => {
        database.ref('recipes/').get().then((snapshot) => {
            const data = firebaseLooperTwo(snapshot)
            console.log(data)
            setBatch(data)
           
        })
      })

  return (
    <>
    <Sidebar match={match}/>
    <Page
      className={classes.root}
      title="Batch Logs"
    >
      <Container maxWidth={false}>
        <Toolbar />

        <Box mt={3}>
          <Table align="center">
              <TableBody>
                {batch.map((batch) => (
            <Results match={match} customers={customers} values={batch}/>
          ))
        }
              </TableBody>
          
          </Table>
         </Box>
      </Container>
    </Page>
    </>
  );
};

export default BatchListView;