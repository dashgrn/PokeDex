import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { searchAsync } from '../actions/pokeActions'
import { getAllPkm, getIdividualPkm } from '../helpers/fetchAllPkm'

const getAllPkmURL = 'https://pokeapi.co/api/v2/pokemon/?limit=25'

export const PokeCard = () => {

    const dispatch = useDispatch()

    const [pokemonDataArray, setPokemonDataArray] = useState([])
    const [loadNextPage, setLoadNextPage] = useState('');

    const {pokemon} = useSelector((state) => state.pokemones)


    useEffect(() => {
        async function fetchData() {
            let response = await getAllPkm(getAllPkmURL)
            setLoadNextPage(response.next);

            await loadPokemon(response.results);

        }
        fetchData();
    }, [])

    const loadPokemon = async (data) => {
        let pkmDataObj = await Promise.all(data.map(async pokemon => {
            let pokeKeeper = await getIdividualPkm(pokemon)
            return pokeKeeper
        }))
        setPokemonDataArray(pkmDataObj);
    }


    console.log('individual pokemon data array', pokemonDataArray)

    const formik = useFormik({
        initialValues: {
            query: ''
        },
        onSubmit: (query) => {
            console.log('formik submit data', query)
            dispatch(searchAsync(query))
            console.log('data array before', pokemonDataArray)
            setPokemonDataArray([])
            setPokemonDataArray([pokemon])
            console.log('data array after', pokemonDataArray)
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
            <Row xs={1} md={4} className="g-4">


                {
                    pokemonDataArray.map((pkm, index) => (
                        <Col key={index}>
                            <Card  style={{ width: '10rem' }}>
                                <Card.Img src={pkm.sprites.front_default} />
                                <Card.Body>
                                    <Card.Title>{pkm.name}</Card.Title>
                                    <Card.Text>
                                        Type: {pkm.types.map((type, index) => {
                                            return (
                                                <div key={index}>
                                                    <p>{type.type.name}</p>
                                                </div>
                                            )
                                        })}

                                        Number: {pkm.id}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))

                }


            </Row>
            <Button className="btn btn-warning m-2">
                Cargar Más
            </Button>
        </>
    )
}