import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from './Toolbar';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = () => ({
  root: {
    width: '100%',
    marginTop: "30px",
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
     backgroundColor: "whitesmoke",
    },
  },
});

function BatchLogList({batch}) {
  const classes = useStyles();

  return (
    <>
    
    <Paper className={classes.root}>
      <Toolbar/>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Recipe Name</CustomTableCell>
            <CustomTableCell align="right">Started At</CustomTableCell>
            <CustomTableCell align="right">Recipe id</CustomTableCell>
            <CustomTableCell align="right">Operator</CustomTableCell>
            <CustomTableCell align="right"></CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {batch.map(batch => (
            <TableRow className={classes.row} key={batch.id}>
              <CustomTableCell component="th" scope="row">
                {batch.recipe_name}
              </CustomTableCell>
              <CustomTableCell align="right">{batch.startedAt}</CustomTableCell>
              <CustomTableCell align="right">{batch.recipe_id}</CustomTableCell>
              <CustomTableCell align="right">{batch.operator}</CustomTableCell>
              <CustomTableCell align="right"></CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    </>
  );
}

BatchLogList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(BatchLogList);