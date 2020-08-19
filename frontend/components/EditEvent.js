import React from 'react'
import axios from './helpers/axios-requests';
import { connect } from 'react-redux';



class EditEvent extends React.Component{
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
    componentDidMount(){
        axios.get(`/events/${this.props.match.params.id}`, {headers: {'Authorization': `Token ${this.props.token}`}})
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

export default connect(mapStatetoProps)(EditEvent);