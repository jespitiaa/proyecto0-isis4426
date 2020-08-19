import React, { Component } from "react";
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './helpers/store';
import Layout from './Layout';

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <BrowserRouter>
          <Layout/>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
