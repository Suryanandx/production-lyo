import { Box, TableCell, TableHead, TableRow } from '@material-ui/core'
import React from 'react'

const Head = () => {
    return (
        <Box minWidth={1050}>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                    <strong>ID</strong>
                </TableCell>
                <TableCell align="center">
                 <strong>Image</strong> 
                </TableCell>
                
                <TableCell align="center">
                  <strong>Time Started</strong> 
                </TableCell>
              </TableRow>
            </TableHead>
            
        </Box>
    )
}

export default Head
