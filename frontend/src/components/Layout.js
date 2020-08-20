import React from 'react'
import {Route, Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import CreateUser from "./CreateUser";
import Login from "./Login";
import ListEvents from "./ListEvents";
import EventDetail from "./EventDetail";
import EditEvent from "./EditEvent";
import CreateEvent from "./CreateEvent";
import {UNAUTHENTICATE} from "./helpers/actionTypes"

class Layout extends React.Component{
    render(){
        console.log(this.props)
        if(!this.props.authenticate && (window.location.pathname!=="/login"))
            return <Redirect to='/login'/>
        return <>
            <div className="container">
                {this.props.authenticate?
                    <ul className='nav'>
                        <li className='nav'><Link to ='/'>Home</Link></li>
                        <li className='nav'><button onClick={this.props.onExpired}>Exit</button></li>
                    </ul>
                :''}

                <Route path="/" exact component={ListEvents}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={CreateUser}/>
                <Route path="/events" exact component={ListEvents}/>
                <Route path="/events/:id" exact component={EventDetail}/>
                <Route path="/events/:id/edit" exact component={EditEvent}/>
                <Route path="/event/create" exact component={CreateEvent}/>
            </div>
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


export default connect(mapStatetoProps, mapDispatchToProps)(Layout);