import React from 'react';
import { connect } from 'react-redux';

import Table from 'react-bootstrap/Table';
import {Button} from 'react-bootstrap';
import axios from './helpers/axios-requests';

class ListEvents extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            requested : false,
            eventos : [] 
        }
    }

    componentDidMount(){
        axios.get('/api/events', {headers: {'Authorization': `Token ${this.props.token}`}})
        .then(res=>{
            this.setState({
                eventos: res.data,
                requested:true
            }
        )})
        .catch(e=>{
            alert('Hubo un problema en la conexión con el servidor')
        })
    }
    render(){
        return <div>
            <Button>Crear un evento</Button>
        {this.state.eventos && this.state.eventos.length?
            <Table className="alternatebg">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Lugar del evento</th>
                        <th>Dirección del Evento</th>
                        <th>Desde</th>
                        <th>Hasta</th>
                        <th>Tipo</th>
                        <th>Detalles</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.eventos.map((evt)=>{
                        return <tr>
                            <td>{evt.event_name}</td>
                            <td>{evt.event_category}</td>
                            <td>{evt.event_place}</td>
                            <td>{evt.event_address}</td>
                            <td>{evt.event_initial_date}</td>
                            <td>{evt.event_final_date}</td>
                            <td>{evt.event_type}</td>
                            <td><Button>Ver evento</Button></td>
                            <td><Button onClick={this.handleDelete(evt.id)}></Button></td>
                        </tr>
                    })}
                </tbody>
            </Table>
            : this.state.requested? <p>No has creado eventos</p>: <p>Cargando</p> 
        }
        </div>
    }
    handleDelete=(id)=>{
        axios.delete(`/api/event/${id}`, {headers: {'Authorization': `Token ${this.props.token}`}})
        .then(res=>{
            alert('Se ha eliminado el evento exitosamente')
            window.location.reload();
        })
        .catch(e=>alert('No se ha podido eliminar el evento'))
    }
}

const mapStatetoProps = state =>{
    return {
        token: state.token,
    }
}

export default connect(mapStatetoProps)(ListEvents);
