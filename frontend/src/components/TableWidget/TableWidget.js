import { TableContainer } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import React from 'react';
import { OverlayCircularProgress } from '../OverlayCircularProgress';
import TableData from './TableData';
import TableToolbar from './TableToolbar';
import { TableWidgetHeader } from './TableWidgetHeader';
import { useTableWidgetStyles } from './styles';


const TableWidget = ({ headers, onSort, title, data, count, page, rowsPerPage, rowsPerPageOptions, onChangePage, onChangeRowsPerPage, loading }) => {
  const classes = useTableWidgetStyles();

  return (
    <Box>
      <Paper>
        <TableToolbar title={ title }/>
        <TableContainer className={ classes.tableContainer }>
          <Table>
            <TableWidgetHeader
              headers={ headers }
              onSort={ onSort }
            />
            <TableData
              data={ data }
              headers={ headers }
            />
          </Table>
          <OverlayCircularProgress show={ loading }/>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={ rowsPerPageOptions }
          component="div"
          count={ count }
          rowsPerPage={ rowsPerPage }
          page={ page }
          onChangePage={ onChangePage }
          onChangeRowsPerPage={ onChangeRowsPerPage }
        />
      </Paper>
    </Box>
  );
};

export default TableWidget;