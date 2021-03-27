import React, { useEffect, useState } from 'react'
import { database } from '../../firebase'
import { firebaseLooperTwo } from '../../utils/tools'
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import Sidebar from '../../components/Sidebar/Sidebar';

const BatchInfo = ({match}) => {

    const [batch, setBatch] = useState([])

    
    useEffect(() => {
        database.ref('batch').get().then(snapshot => {
            const data = firebaseLooperTwo(snapshot)
            console.log(data)
            setBatch(data)

        })
    })
    return (
        <>
        <Sidebar match={match}/>
         <Card
         styles={{marginTop: "10%"}}
      >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                   
                    color="primary"
              />
                </TableCell>
                <TableCell align="center">
                  <strong>ID</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Image</strong> 
                </TableCell>
                <TableCell align="center">
                   <strong>Time</strong>
                </TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
              {batch.map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                 
                >
                  <TableCell  padding="checkbox" align="center">
                    <Checkbox
                      value="true"
                    />
                  </TableCell>
                  <TableCell align="center"> 
                      <Typography
                      align="center"
                        color="textPrimary"
                        variant="button"
                      >
                        {customer.id}
                      </Typography>
                   
                  </TableCell>
                  <TableCell align="center">

                  <img
                  height="200px"
                  width="300px"
                       src={customer.url}
                      />
                       
                  </TableCell>
                  <TableCell align="center">
                    {customer.time}
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        
       
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
    </>
    )
}

export default BatchInfo
