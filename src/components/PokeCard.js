import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'


export const PokeCard = () => {

    

    return (
        <>
            <Form.Control type="text" placeholder="Busca un Pokemon" />
            <Card style={{ width: '18rem' }}>
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
