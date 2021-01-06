import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserContext } from '../context/actions/user_context';

const PrivateRoute = () => {
  return <h4>Private Route</h4>;
};

export default PrivateRoute;
