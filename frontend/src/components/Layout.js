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
        console.log(this.props)
        if(!this.props.authenticate && (window.location.pathname!=="/login"))
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



export default connect(mapStatetoProps)(Layout);