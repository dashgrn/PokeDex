import { useFormik } from 'formik'
import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { searchAsync } from '../actions/pokeActions'


export const PokeCard = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            query: ''
        },
        onSubmit: (query) => {
            console.log('formik submit data', query)
            dispatch(searchAsync(query))
            formik.resetForm()
        }
    })



    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Form.Control
                    value={formik.values.query}
                    name="query"
                    onChange={formik.handleChange}
                    type="text"
                    placeholder="Busca un Pokemon"
                />
            </form>

            <Card className="m-6" style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Pokemon Name</Card.Title>
                    <Card.Text>
                        # 1
                    </Card.Text>
                    <Card.Text>
                        Type: Fire
                    </Card.Text>
                    <Button variant="primary">Details</Button>
                </Card.Body>
            </Card>
        </>
    )
}
