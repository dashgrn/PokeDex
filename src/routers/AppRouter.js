import React, { useEffect, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Login from '../components/Login';
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { PublicRoutes } from './PublicRoutes'
import { PrivateRoutes } from './PrivateRoutes'
import { PrivateContainer } from './PrivateContainer'


export default function AppRouter() {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            console.log(user ? 'loged in' : 'Not logged');
            if (user?.uid) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false)
            }
            setChecking(false)
        })

    }, [dispatch, setChecking, setIsLoggedIn])

    if (checking) {
        return (
            <div>
                Autenticando
            </div>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={
                    <PublicRoutes isAuthenticated={isLoggedIn}>
                        <Login />
                    </PublicRoutes>
                } />
                <Route path='/*' element={
                    <PrivateRoutes isAuthenticated={isLoggedIn}>
                        <PrivateContainer />
                    </PrivateRoutes>
                } />
            </Routes>
        </BrowserRouter>
    );
}