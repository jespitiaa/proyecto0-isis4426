import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import CreateUser from "./CreateUser";
import Login from "./Login";
import ListEvents from "./ListEvents";
import EventDetail from "./EventDetail";
import EditEvent from "./EditEvent";
import CreateEvent from "./CreateEvent";

class Layout extends React.Component{
    render(){
        if(!props.authenticate && (location.pathname!=="/login"))
            return <Redirect to='/login'/>
        return <>
            <Route path="/" exact component={ListEvents}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={CreateUser}/>
            <Route path="/events" exact component={ListEvents}/>
            <Route path="/events/:id" exact component={EventDetail}/>
            <Route path="/events/:id/edit" exact component={EditEvent}/>
            <Route path="/event/create" exact component={CreateEvent}/>
        </>
    }
}

const mapStatetoProps = state =>{
    return {
        authenticate: state.authenticate,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onExpired: ()=>{
            return dispatch({type:UNAUTHENTICATE})
        } 
    }
}


export default connect(mapStatetoProps,mapDispatchToProps)(Layout);