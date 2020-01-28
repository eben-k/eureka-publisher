import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CoreLayout from '../layouts/CoreLayout';
import PublisherApp from '../layouts/PublisherApp';
import LoginView from '../views/LoginView';
import DashboardView from '../views/DashboardView';
import RegisterView from '../views/RegisterView';

export default () => (
  <Router>
    <Route component={CoreLayout} path='/'></Route>
    <Route component={PublisherApp} exact path='/home' name='home'></Route>
    <Route component={LoginView} exact path='/login' name='login'></Route>
    <Route component={DashboardView} exact path='/dashboard' name='dashboard'></Route>
    <Route component={RegisterView} exact path='/register' name='register'></Route>
  </Router>
)
