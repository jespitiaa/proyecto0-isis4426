import React from "react";

import { Provider } from 'react-redux';
import store from './helpers/store';
import ListEvents from './ListEvents';

class App extends React.Component{
render(){
  return ( <Provider store = {store}>
    <div>
      <ListEvents/>
      <h1> Hola Mundo! </h1>
    </div>
  </Provider>
  );
}
}
export default App;

