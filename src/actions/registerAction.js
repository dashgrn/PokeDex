import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth"
import { types } from "../types/types"

export const register = (email, password) => {
    return {
        type: types.register,
        payload:{
            email,
            password
        }
    }
}

export const registerEmailPassword = (email, password) => {
    return (dispatch) => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                await updateProfile(auth.currentUser, { displayName: email })
                dispatch(register(user.email, user.uid))
                console.log(user)
            })

            .catch(error => {
                console.log(error);
            })
    }
}