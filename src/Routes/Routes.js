import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { app } from '../Firebase/Firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";


const Routes = ({ Cmp, logIn, setLogIn }) => {
    const navigate = useNavigate()
    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setLogIn(uid)
            } else {
                setLogIn(null)
            }
        });
    }, [])

    useEffect(() => {
        if (!logIn) {
            navigate('/login')
        }
    }, [logIn])

    return (
        Cmp
    )
}

export default Routes