// App.js
// import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import {CartProvider} from './context/CartContext'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import './App.css'

const App = () => (
  <CartProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </CartProvider>
)

export default App
