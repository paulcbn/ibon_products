import { TableCell, TableRow, TableSortLabel, Toolbar, withStyles } from '@material-ui/core';

export const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.grey['400'],
    fontSize: 16,
    fontWeight: 'bold',
  },
}))(TableCell);

export const StyledToolbar = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey['400'],
  },
}))(Toolbar);

export const StyledTableSortLabel = withStyles(theme => ({}))(TableSortLabel);

export const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey['100'],
    },
  },
}))(TableRow);