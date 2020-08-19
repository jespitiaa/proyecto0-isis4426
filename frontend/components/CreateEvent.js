import React from 'react'
import axios from './helpers/axios-requests';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'


class CreateEvent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            event_name:'',
            event_category:'',
            event_place:'',
            event_address:'',
            event_initial_date:'',
            event_final_date:'',
            event_type:'',
            thumbnail:''
        }
    }
    
    render(){
        return <>
            <div></div>
            <div></div>
        </>
    }
}

const mapStatetoProps = state =>{
    return {
        token: state.token,
    }
}

export default connect(mapStatetoProps)(CreateEvent);