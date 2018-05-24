import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PortafolioDashboardPage from '../components/PortafolioDashboardPage';
import AddCoinPage from '../components/AddCoinPage';
import EditCoinPage from '../components/EditCoinPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import UserList from '../components/UserList';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true}/>
        <PrivateRoute path="/list" component={UserList}/>
        <PrivateRoute path="/dashboard" component={PortafolioDashboardPage} />
        <PrivateRoute path="/add" component={AddCoinPage}/>
        <PrivateRoute path="/edit/:id" component={EditCoinPage}/>
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
