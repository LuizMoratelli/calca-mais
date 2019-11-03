import React from 'react'
import ReduxToastr from 'react-redux-toastr';
import { Provider } from 'react-redux';
import Routes from './routes';
import store from './store';
import GlobalStyle from './styles/global';

const App = () => (
  <Provider store={store}>
    <>
      <Routes />
      <ReduxToastr />
      <GlobalStyle/>
    </>

  </Provider>
)

export default App
