import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Component/Signup'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from './Component/Home';
import Login from './Component/Login';
import ProtectedRoute from './Routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './Component/Header';
import { app } from './Firebase/Firebase';


const App = () => {
  const [logIn, setLogIn] = useState(null)

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

  }, [logIn])

  return < BrowserRouter >
    <Header logIn={logIn} setLogIn={setLogIn} />
    <Routes>
      <Route path='/' element={<ProtectedRoute logIn={logIn} setLogIn={setLogIn} Cmp={<Home />} />} />
      <Route path='/login' element={<Login logIn={logIn} setLogIn={setLogIn} />} />
      <Route path='/signup' element={<Signup logIn={logIn} setLogIn={setLogIn} />} />
    </Routes>
  </ BrowserRouter>
}

export default App;