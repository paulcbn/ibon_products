import Typography from '@material-ui/core/Typography';
import React from 'react';
import { StyledToolbar } from './StyledComponents';
import { useToolbarStyle } from './styles';

const TableToolbar = ({ title }) => {
  const classes = useToolbarStyle();

  return <StyledToolbar>
    <Typography className={ classes.title } variant="h6">
      { title }
    </Typography>
  </StyledToolbar>;
};

export default TableToolbar;