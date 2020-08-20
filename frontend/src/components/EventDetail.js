import React from 'react'
import axios from './helpers/axios-requests';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class EventDetail extends React.Component{
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
            thumbnail:'',
            requested:false
        }
    }
    componentDidMount(){
        axios.get(`/api/events/${this.props.match.params.id}`, {headers: {'Authorization': `Token ${this.props.token}`}})
        .then(res=>{
            this.setState({
            ...res.data
            })});
    }
    render(){
        return this.state.event_name?<>
        <Link to={`/events/${this.props.match.params.id}/edit`}>Editar</Link>
        <h1>{this.state.event_name}</h1>
        <img src={this.state.thumbnail} width={'720px'}/>
        <h2>Información del evento</h2>
        <div>
            <div>
                {this.state.event_category}
                {this.state.event_type}
                {this.state.event_place}
                {this.state.event_address}
            </div>
            <div>
                {this.state.event_initial_date}
                {this.state.event_final_date}
            </div>
        </div>
        </>
        :this.state.requested?
            <p>No existe el recurso o no tiene permiso para acceder</p>
            :<p>Cargando información...</p>
    }
}

const mapStatetoProps = state =>{
    return {
        token: state.token,
    }
}

export default connect(mapStatetoProps)(EventDetail);
