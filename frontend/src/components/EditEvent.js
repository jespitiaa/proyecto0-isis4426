import React from 'react'
import axios from './helpers/axios-requests';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
const FormData = require('form-data');
const fs = require('fs');

class CreateEvent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            event_name:'',
            event_category:'CONFERENCE',
            event_place:'',
            event_address:'',
            event_initial_date:'',
            event_final_date:'',
            event_type:'VIRTUAL',
            thumbnail:''
        }
    }
    componentDidMount(){
        axios.get(`/api/events/${this.props.match.params.id}`, {headers: {'Authorization': `Token ${this.props.token}`}})
        .then(res=>{this.setState({...res.data})})
    }
    render(){
        return <>
        <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicName">
                <Form.Label>Nombre del evento</Form.Label>
                <Form.Control type="text" placeholder="Event name" onChange={(event)=>this.setState({event_name:event.target.value})} />
            </Form.Group>
            
            <Form.Group controlId="formBasicCategory">
                <Form.Label>Categoría del evento</Form.Label>
                <Form.Control 
                    as="select" 
                    name='Event category'
                    onChange={(event)=>this.setState({event_category:event.target.value})}
                    value={this.state.event_category}
                    >
                    <option key={1} value='CONFERENCE'>Conferencia</option>
                    <option key={2} value='SEMINAR'>Seminario</option>
                    <option key={3} value='CONGRESS'>Congreso</option>
                    <option key={4} value='COURSE'>Curso</option>
                </Form.Control>
            </Form.Group>
            
            <Form.Group controlId="formBasicPlace">
                <Form.Label>Nombre del lugar del evento</Form.Label>
                <Form.Control type="text" placeholder="Event place" onChange={(event)=>this.setState({event_place:event.target.value})} />
            </Form.Group>
            
            <Form.Group controlId="formBasicAddress">
                <Form.Label>Dirección del lugar del evento</Form.Label>
                <Form.Control type="text" placeholder="Event address" onChange={(event)=>this.setState({event_address:event.target.value})} />
            </Form.Group>
            
            <Form.Group controlId="formBasicInitDate">
                <Form.Label>Fecha de inicio del evento</Form.Label>
                <Form.Control type="text" placeholder="<YYYY-MM-DD>T<HH:MM:SS>Z" onChange={(event)=>this.setState({event_initial_date:event.target.value})} />
            </Form.Group>
            
            <Form.Group controlId="formBasicFinalDate">
                <Form.Label>Fecha de fin del evento</Form.Label>
                <Form.Control type="text" placeholder="<YYYY-MM-DD>T<HH:MM:SS>Z" onChange={(event)=>this.setState({event_final_date:event.target.value})} />
            </Form.Group>

            <Form.Group controlId="formBasicType">
                <Form.Label>Tipo del evento</Form.Label>
                <Form.Control 
                    as="select" 
                    name='Event category'
                    onChange={(event)=>this.setState({event_type:event.target.value})}
                    value={this.state.event_type}
                    >
                    <option key={5} value='VIRTUAL'>Virtual</option>
                    <option key={6} value='PRESENCIAL'>Presencial</option>
                </Form.Control>
            </Form.Group>
            
            <Form.Group controlId="formBasicThumbnail">
                <Form.Label>Banner del evento</Form.Label>
                <input id="imagen-evt" name="file" type="file"
                className="file-upload" multiple={false} 
                onChange={(evt)=>{this.setState({thumbnail:evt.target.files[0]})}}/>
            </Form.Group>
            
            <button className="yandw" onClick={this.handleSubmit}>
                Cambiar información
            </button>
        </Form>
        </>
    }

    handleSubmit(event){
        event.preventDefault();
        var data = new FormData();
        data.append('event_name', this.state.event_name);
        data.append('event_category', this.state.event_category);
        data.append('event_place', this.state.event_place);
        data.append('event_address', this.state.event_address);
        data.append('event_initial_date', this.state.event_initial_date);
        data.append('event_final_date', this.state.event_final_date);
        data.append('event_type', this.state.event_type);
        data.append('thumbnail', this.state.thumbnail);
        await axios.put('/api/events', data, {headers: {'Authorization': `Token ${this.props.token}`}})
        .then(res=>{
            if(res.status >=200 && res.status <300){
                alert('Se ha editado el evento')
                window.location.pathname='/events'
                window.location.reload()
            }
        })
        .catch(e=>{
            console.log(e)
            alert('Hubo un error en la edición del evento')
        })
    }
}

const mapStatetoProps = state =>{
    return {
        token: state.token,
    }
}

export default connect(mapStatetoProps)(CreateEvent);