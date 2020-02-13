import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { auth } from '../../../lib/redux/actions';
import { Dashboard } from '../../../pages/Dashboard';
import { Login } from '../../../pages/Login';
import { NotFound } from '../../../pages/NotFound/';
import { ProductDetail } from '../../../pages/ProductDetail';
import { ProductsMaster } from '../../../pages/ProductsMaster';

import PrivateRoute from '../PrivateRoute';

const RootContainer = ({ loadUser, auth }) => {
  useEffect(() => {
    loadUser();
  }, [ loadUser ]);

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={ Dashboard } authState={ auth }/>
        <PrivateRoute exact path="/products" component={ ProductsMaster } authState={ auth }/>
        <PrivateRoute exact path="/products/:productId" component={ ProductDetail } authState={ auth }/>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
