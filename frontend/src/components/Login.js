import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import axios from './helpers/axios-requests'
var qs = require('qs');

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {username: '',contrasena:'', values:{}};
    }1
    handleChangeCorreo = (event) => {
        this.setState({correo: event.target.value});
    }

    handleChangeContrasena= (event) => {
        this.setState({contrasena: event.target.value});
    }
    handleSubmit = async(event)=>{
        let data = qs.stringify({
            'username': this.state.username,
            'password': this.state.contrasena 
        });
        await axios.post('/api/api-auth', data)
        .then(res=>{
            if(res.status >=200 && res.status <300){
                if(res.data.token) this.props.onLoginSuccesfull(res.data.token)
                else alert('Correo o contraseña incorrecto')
            }
            else alert('Correo o contraseña incorrecto')
        })
        .catch(e=>{
            alert('Hubo un error en la autenticación')
        })
      }
    render(){
        if (this.props.authenticate ){
            return <Redirect to="/"/>
        }
        return <div>
        <div className="logoLogin">
            <img src='/Escudo.svg' width={'350px'}/>
        </div>
        <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="text" placeholder="Username" onChange={this.handleChangeCorreo} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={this.handleChangeContrasena} />
            </Form.Group>
            <button className="yandw" type="submit">
                Ingresar
            </button>
        </Form>
        <div>
            ¿No tienes cuenta? <br/><button onClick={this.props.switch}>Crear usuario</button>
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

const mapDispatchToProps = dispatch => {
    return{
        onLoginSuccesfull: (token)=>{
            return dispatch({type:AUTHENTICATE, token:token})
        } 
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(Login);