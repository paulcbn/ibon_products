import { TableCell, TableRow, TableSortLabel, Toolbar, withStyles } from '@material-ui/core';

export const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.grey['900'],
    color: theme.palette.grey['300'],
    fontSize: 16,
    fontWeight: 'bold',
  },
}))(TableCell);

export const StyledToolbar = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey['900'],
    color: theme.palette.grey['300'],
    borderRadius: theme.spacing(0.5, 0.5, 0, 0),
  },
}))(Toolbar);

export const StyledTableSortLabel = withStyles(theme => ({
  root: {
    color: theme.palette.grey['300'],
    '&:focus': {
      color: theme.palette.grey['300'],
    },
    '&:hover': {
      color: theme.palette.grey['500'],
    },
    '&.MuiTableSortLabel-active': {
      color: theme.palette.grey['300'],
    },
    '&.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-icon': {
      color: theme.palette.grey['300'],
    },
  },
  icon: {
    color: theme.palette.grey['300'],
  },
  active: {
    color: theme.palette.grey['300'],
    '&:focus': {
      color: theme.palette.grey['300'],
    },
    '&:hover': {
      color: theme.palette.grey['500'],
    },
    '& .MuiTableSortLabel-icon': {
      color: theme.palette.grey['300'],
    },
  },

}))(TableSortLabel);

export const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey['100'],
    },
  },
}))(TableRow);