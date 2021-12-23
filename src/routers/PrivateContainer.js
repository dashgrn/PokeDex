import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import {Home} from '../components/Home'
export const PrivateContainer = () => {
    return (
        <>
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/*' element={<Navigate to='/home' />} />
            </Routes>
        </>
    )
}