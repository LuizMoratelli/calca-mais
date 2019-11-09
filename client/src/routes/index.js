import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Switch } from 'react-router-dom'

import history from './history'
import Private from './private'
import Guest from './guest'

import Main from '../pages/Main'
import SignIn from '../pages/Auth/SignIn'
import Schoes from '../pages/Schoes'
import Category from '../pages/Category'
import User from '../pages/User'

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Guest path="/signin" component={SignIn} />
      <Private path="/" exact component={Main} />
      <Private path="/category" component={Category} />
      <Private path="/schoes" component={Schoes} />
      <Private path="/users" component={User} />
    </Switch>
  </ConnectedRouter>
)

export default Routes
