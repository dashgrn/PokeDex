import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { searchAsync } from '../actions/pokeActions'

const getAllPkmURL = 'https://pokeapi.co/api/v2/pokemon/?limit=25'

export const PokeCard = () => {

    const dispatch = useDispatch()

    const [getNextPg, setGetNextPg] = useState('')

    const [pkmData, setPkmData] = []

    //get all pkm (individual url) HELPER FUNCTION
    const getAllPkm = async (url) => {
        await axios.get(url)
            .then( res => {
                console.log('all data res', res.data)
                return res.data
            })
            .catch( err => {console.log('error',err)})
    }

    //get individual pkm from url  HELPER FUNCTION
    const pkmDataFetcher = async (url) => {
        await axios.get(url)
            .then(res => {

                return res.data
            })
            .catch(err => { console.log('error', err) })
    }
    
    const loadPkm = async (data) => {
        console.log('data as params', data)
        let pokemonArr = data.map( async pkm => {
            let pokeKeeper = pkmDataFetcher(pkm.url)
            return pokeKeeper
        })

        setPkmData(pokemonArr)
    }


    useEffect(() => {
        const fetchPkm = async (url) => {
            let res = await getAllPkm(url)
            console.log('res useEffect', res)
        }
        fetchPkm(getAllPkmURL)
    }, [])


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

            <Card className="mx-6" style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Pokemon Name</Card.Title>
                    <Card.Text>
                        # 1
                    </Card.Text>
                    <Card.Text>
                        Type: Fire
                    </Card.Text>
                    <Button variant="info">Details</Button>
                </Card.Body>
            </Card>

            <Button className="btn btn-warning m-2">
                Cargar Más
            </Button>
        </>
    )
}