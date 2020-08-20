import React from "react";

import { connect } from 'react-redux';
import ListEvents from './ListEvents';
import CreateUser from './CreateUser';
import Login from './Login';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      creatingUser:false
    }
  }
  switchToLogin(){
    this.setState({creatingUser:false})
  }
  switchToRegister(){
    this.setState({creatingUser:true})
  }
  render(){
    if(!this.props.authenticate && !this.props.token){
      if(this.state.creatingUser){
        return <CreateUser switch={this.switchToLogin}/>
      }
      else{
        return <Login switch={this.switchToRegister}/>
      }
    }
    else{
      return <ListEvents/> 
    }
  }
}

const mapStatetoProps = state =>{
  return {
      authenticate: state.authenticate,
      token: state.token,
  }
}

export default connect(mapStatetoProps)(App);

