import React from 'react'
import axios from './helpers/axios-requests'
import Form from 'react-bootstrap/Form'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

var qs = require('qs');

class CreateUser extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            contrasena:'', 
            email:'', 
            first_name:'',
            last_name:'',
        };
    }
    handleChangeUsr = (event) => {
        this.setState({username: event.target.value});
    }
    handleChangeContrasena= (event) => {
        this.setState({contrasena: event.target.value});
    }
    handleChangeEmail= (event) => {
        this.setState({email: event.target.value});
    }
    handleChangeFirstName= (event) => {
        this.setState({first_name: event.target.value});
    }
    handleChangeLastName= (event) => {
        this.setState({last_name: event.target.value});
    }
    handleSubmit = async(event)=>{
        let data = qs.stringify({
            'username': this.state.username,
            'password': this.state.contrasena,
            'email':this.state.email, 
            'first_name':this.state.first_name,
            'last_name':this.state.last_name
        });
        await axios.post('/api/create-user', data)
        .then(res=>{
            if(res.status >=200 && res.status <300){
                alert('Se ha creado el usuario. Por favor inicie sesión')
                this.props.switch()
            }
            alert('Correo o contraseña incorrecto')
        })
        .catch(e=>{
            alert('Hubo un error en la autenticación')
        })
      }
    render(){
        return <div>
        <div className="logoLogin">
            <img src='/Escudo.svg' width={'350px'}/>
        </div>
        <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicUsr">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="text" placeholder="Username" onChange={this.handleChangeUsr} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={this.handleChangeContrasena} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="text" placeholder="Username" onChange={this.handleChangeEmail} />
            </Form.Group>

            <Form.Group controlId="formBasicFirst">
                <Form.Label>Nombres</Form.Label>
                <Form.Control type="text" placeholder="First name" onChange={this.handleChangeFirstName} />
            </Form.Group>
            <Form.Group controlId="formBasicLast">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="text" placeholder="Last name" onChange={this.handleChangeLastName} />
            </Form.Group>

            <button className="yandw" type="submit">
                Ingresar
            </button>
        </Form>
        <div>
            ¿Ya tienes cuenta? <br/><Link to='/login'>Inicia sesión</Link>
        </div>
    </div>
    }
}
const mapStatetoProps = state =>{
    return {
        authenticate: state.authenticate,
        token: state.token,
    }
}

export default connect(mapStatetoProps)(CreateUser);