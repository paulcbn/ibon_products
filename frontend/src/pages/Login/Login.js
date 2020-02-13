import { Box, Button, Container, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { auth } from '../../lib/redux/actions';


import useStyles from './styles';


const Login = ({ errors, loading, isAuthenticated, login }) => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const classes = useStyles();

  function handleSubmit(event) {
    event.preventDefault();
    login(username, password);
  }

  if (isAuthenticated)
    return <Redirect to="/"/>;

  return <Container maxWidth="sm" className={ classes.loginContainer }>
    <form onSubmit={ handleSubmit }>
      <Paper className={ classes.loginPaper }>
        <Typography variant="h2">
          Products
        </Typography>
        <TextField variant="outlined" label="Username"
                   error={ !!errors.username }
                   helperText={ errors.username }
                   onChange={ event => setUsername(event.target.value) }
                   value={ username }
                   className={ classes.loginInput }
        />
        <TextField variant="outlined" label="Password"
                   error={ !!errors.password }
                   helperText={ errors.password }
                   type="password"
                   onChange={ event => setPassword(event.target.value) }
                   value={ password }
                   className={ classes.loginInput }
        />
        <Box className={ classes.buttonBox }>
          <Button variant="contained" size="large" color="primary" type="submit">Login</Button>
        </Box>
      </Paper>
    </form>
  </Container>;

};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.auth.loginErrors,
    loading: state.auth.loginLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      return dispatch(auth.login(username, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
