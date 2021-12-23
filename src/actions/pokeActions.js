import axios from "axios"
import { types } from "../types/types"

//list
//sync action
export const list = (products) => {
    return {
        type: types.list,
        payload: products
    }
}

//search
export const searchAsync = (search) => {
    console.log('search q', search.query)
    return async (dispatch) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${search.query}`)
        .then(res => {
            console.log('axios get res', res.data)
            dispatch(searchSync(res.data))
        }    
        )
    }
}

export const searchSync = (search) => {
    return {
        type: types.search,
        payload: search
    }
}