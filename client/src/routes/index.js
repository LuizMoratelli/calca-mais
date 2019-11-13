import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Switch } from 'react-router-dom'

import history from './history'
import Private from './private'
import Guest from './guest'

import Main from '../pages/Main'
import SignIn from '../pages/Auth/SignIn'
import SignUp from '../pages/Auth/SignUp'
import Calcados from '../pages/Calcados'
import Categorias from '../pages/Categorias'
import Usuarios from '../pages/Usuarios'
import Pedidos from '../pages/Pedidos'

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Guest path="/signin" component={SignIn} />
      <Guest path="/signup" component={SignUp} /> 
      <Private path="/" exact component={Main} />
      <Private path="/categorias" component={Categorias} />
      <Private path="/calcados" component={Calcados} />
      <Private path="/usuarios" component={Usuarios} />
      <Private path="/pedidos" component={Pedidos} />
      {//<Private path="/pedidoscalcados" component={PedidosCalcados} />
      }
    </Switch>
  </ConnectedRouter>
)

export default Routes
