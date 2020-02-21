import { TableContainer } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import React from 'react';
import { OverlayCircularProgress } from '../OverlayCircularProgress';
import { useTableWidgetStyles } from './styles';
import TableData from './TableData';
import TableToolbar from './TableToolbar';
import { TableWidgetHeader } from './TableWidgetHeader';


const TableWidget = ({ headers, onSort, title, data, count, page, rowsPerPage, rowsPerPageOptions, onChangePage, onChangeRowsPerPage, loading, onSearch, actions }) => {
  const classes = useTableWidgetStyles();

  return (
    <Box>
      <Paper className={ classes.paper }>
        <TableToolbar title={ title } onSearch={ onSearch }/>
        <TableContainer>
          <Table size={ 'small' }>
            <TableWidgetHeader
              headers={ headers }
              onSort={ onSort }
              actions={ actions }
            />
            <TableData
              actions={ actions }
              data={ data }
              headers={ headers }
              loading={ loading }
            />
          </Table>
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
        <OverlayCircularProgress show={ loading }/>
      </Paper>
    </Box>
  );
};

export default TableWidget;