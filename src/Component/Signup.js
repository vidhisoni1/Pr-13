import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../Firebase/firebase'


const Signup = ({ logIn, setLogIn }) => {
    const initialInput = { name: '', email: '', password: '' }
    const [input, setInput] = useState(initialInput)
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        if (logIn) {
            navigate('/')
        }
    }, [logIn])

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleForm = (e) => {
        e.preventDefault()
        const checkValidate = validate()
        if (Object.keys(checkValidate).length > 0) {
            setErrors(checkValidate)
        } else {
            setErrors({})
            createUser()
        }
    }

    const createUser = () => {
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, input.email, input.password)
            .then((userCredential) => {
                const user = userCredential.user;
                // ...
                setInput(initialInput)
            })
            .catch((err) => {
                const errorCode = err.code;
                const errorMessage = err.message;
                // ..
                if (errorCode.includes('email')) {
                    setErrors({ email: 'email already exists' })
                }
            });
    }

    const googleLogin = () => {
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user)
                setLogIn(user.uid)
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }

    const validate = () => {
        const errors = {}
        if (input.name.length < 1) {
            errors.name = 'please enter name'
        }
        if (input.email.length < 1) {
            errors.email = 'please enter email'
        }
        if (input.password.length < 1) {
            errors.password = 'please enter password'
        } else if (input.password.length < 6) {
            errors.password = 'password must be atleast 6 chars long'
        }
        return errors
    }

    return (
        <div className="container col-3 mx-auto py-16 px-4 ">
            <h2 className="text-center font-bold mb-6">Sign Up</h2>
            <form onSubmit={handleForm} className='border p-4 rounded'>
                <div className="mb-4">
                    <label htmlFor="name" className="block">Name :</label>
                    <input type="text" id="name" name="name" value={input.name} onChange={handleChange} className="form-control " placeholder='Enter your name*' />
                    <p className='text-danger'>{errors.name}</p>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block">Email :</label>
                    <input type="email" id="email" name="email" value={input.email} onChange={handleChange} className="form-control " placeholder='Enter your email*' />
                    <p className='text-danger'>{errors.email}</p>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block">Password :</label>
                    <input type="password" id="password" name="password" value={input.password} onChange={handleChange} className="form-control " placeholder='Enter your password*' />
                    <p className='text-danger'>{errors.password}</p>
                </div>
                <div className="mb-6">
                    <input type="submit" defaultValue="Sign Up" className="btn btn-success form-control mb-2" />
                </div>
                <p className="text-primary">Already have an account? <Link to="/login">Log In</Link></p>
            </form>
            <button className='btn border border-secondary form-control text-secondary fw-bold mt-3 px-2 py-1.5' onClick={googleLogin}><i ></i> Sign in with Google</button>
        </div>

    )
}

export default Signup
 
