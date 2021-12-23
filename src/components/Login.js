import { useFormik } from 'formik';
import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { loginEmailPassword, loginFacebook, loginGoogle } from '../actions/loginAction';


function Login() {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (data) => {
            console.log(data)
            dispatch(loginEmailPassword(data.email, data.password))
            formik.resetForm()
        }
    })


    const handleLoginGoogle = (evt) => {
        evt.preventDefault()
        dispatch(loginGoogle())
    }
    const handleLoginFacebook = (evt) => {
        evt.preventDefault()
        dispatch(loginFacebook())
    }



    return (
        <div className='m-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card>
                <Card.Body>
                    <Card.Title>Para Usar el PokeDex, debes iniciar sesión</Card.Title>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                                value={formik.values.email}
                                type="email"
                                name="email"
                                required={true}
                                placeholder='ingresa tu email'
                                onChange={formik.handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                value={formik.values.password}
                                type='password'
                                name='password'
                                required={true}
                                placeholder='ingresa tu contraseña'
                                onChange={formik.handleChange}
                            />
                        </Form.Group>
                        <div styles={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Button variant="info" type="submit">
                                Inicia Sesión
                            </Button>
                            <span> o </span>
                            <Button
                                onClick={handleLoginGoogle}
                                className='m-2'
                                variant="outline-warning"
                                type="submit">
                                <img
                                    className="google-icon"
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                    alt="google button" />
                            </Button>
                            <Button
                                onClick={handleLoginFacebook}
                                className='m-2'
                                variant="outline-info"
                                type="submit">
                                <img style={{ width: '24px' }}
                                    className="google-icon "
                                    src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
                                    alt="fb button" />
                            </Button>
                            <hr />
                            <span>¿No tienes una cuenta? <Link to="/register"> Registrate</Link></span>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;