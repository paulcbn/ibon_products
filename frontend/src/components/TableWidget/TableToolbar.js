import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import React, { useCallback, useState } from 'react';
import { StyledToolbar } from './StyledComponents';
import { useToolbarStyle } from './styles';

const TableToolbar = ({ title, onSearch }) => {
  const classes = useToolbarStyle();
  const [ searchString, setSearchString ] = useState('');

  const submitSearch = useCallback((event) => {
    event.preventDefault();
    onSearch && onSearch(searchString);
  }, [ onSearch, searchString ]);


  return <StyledToolbar>
    <Typography className={ classes.title } variant="h6">
      { title }
    </Typography>
    { onSearch && <form
      onSubmit={ submitSearch }
    >
      <Box className={ classes.search }>
        <Box className={ classes.searchIcon }>
          <SearchIcon/>
        </Box>
        <InputBase
          placeholder="Search…"
          classes={ {
            root: classes.inputRoot,
            input: classes.inputInput,
          } }
          value={ searchString }
          onChange={ event => setSearchString(event.target.value) }
          inputProps={ { 'aria-label': 'search' } }
        />
      </Box>
    </form> }
  </StyledToolbar>;
};

export default TableToolbar;