import { types } from "../types/types"

const initialState = {
    pokemones: []
}

export const pokeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.list:
            return {
                pokemon: [...action.payload]
            }
        case types.search:
            return {
                pokemon: action.payload
            }
        default:
            return state;
    }

}