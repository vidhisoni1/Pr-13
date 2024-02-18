import axios from 'axios'
// import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { app } from '../Firebase/firebase'
import { getAuth, signOut } from 'firebase/auth'
import 'bootstrap/dist/css/bootstrap.min.css'


const Header = ({ logIn, setLogIn }) => {

    const handleLogout = (e) => {
        e.preventDefault()
        const auth = getAuth(app);

        signOut(auth)
            .then(() => {
                console.log('User signed out');
                setLogIn(null)
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    }

    return (
        <header className=" py-4">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <nav className='mb-3 text-center'>
                        {/* <Link to="/" className="text-decoration-none btn btn-secondary me-2">Home</Link> */}
                        {!logIn ? <> <Link to="/login" className="text-decoration-none btn btn-primary me-2">Login</Link>
                            <Link to="/signup" className="text-decoration-none btn btn-secondary">SignUp</Link> </> :
                            <a href='#' className="text-decoration-none  btn btn-danger" onClick={handleLogout} to="/logout">Logout</a>}
                    </nav>
                    {/* <h1 className='text-center'>Hello, Welcome...!!</h1> */}
                </div>
            </div>
        </header>
    )
}

export default Header
 