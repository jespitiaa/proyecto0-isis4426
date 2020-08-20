import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './components/helpers/store'
import Layout from './components/Layout'

const App = () => {
  return (
    <Provider store = {store}>
      <BrowserRouter>
        <Layout/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
