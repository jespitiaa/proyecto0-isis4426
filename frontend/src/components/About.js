import React from "react";

import { Provider } from 'react-redux';
import store from './helpers/store';

class About extends React.Component{
render(){
  return ( <Provider store = {store}>
    <div>
      <h1> Hola Mundo! </h1>
    </div>
  </Provider>
  );
}
}
export default About;