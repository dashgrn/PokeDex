import { useFormik } from 'formik'
import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerEmailPassword } from '../actions/registerAction'


export const Register = () => {

    const dispatch = useDispatch()


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            password2: '',
        },
        onSubmit: (data) => {
            console.log('data from reg form', data)

            if (data.password !== data.password2 || data.password.length < 6) {
                alert('Las contraseñs no coinciden y deben ser más de 6 carácteres')
            } else {
                dispatch(registerEmailPassword(data.email, data.password))
                formik.resetForm()
            }
        }
    })

    return (
        <div className='m-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card>
                <Card.Body>
                    <Card.Title >Registro</Card.Title>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                                value={formik.values.email}
                                type="email"
                                placeholder="Ingrese su correo"
                                name="email"
                                onChange={formik.handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Ingrese su contraseña"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicRepitPassword">
                            <Form.Label>Repita contraseña</Form.Label>
                            <Form.Control
                                value={formik.values.password2}
                                type="password"
                                placeholder="Repita contraseña"
                                name="password2"
                                onChange={formik.handleChange}
                            />
                        </Form.Group>
                        <div className="container-btn">
                            <Button
                                styles={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                variant="info" type="submit">
                                Registrarse
                            </Button>
                            <hr />
                            <span>¿Ya tienes una cuenta? <Link to="/login"> Inicia sesión</Link></span>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}
