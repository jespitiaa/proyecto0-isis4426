import React from "react";

import { Provider } from 'react-redux';
import store from './helpers/store';
import App from './App';

class About extends React.Component{
    render(){
        return <Provider store = {store}>
            <App/>
        </Provider>;
    }
}
export default About;
