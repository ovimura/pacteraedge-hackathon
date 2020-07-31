import React, { Component } from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import home from './components/home'
import Header from './components/header'
import Footer from './components/footer';
import keywords from './components/keywords';
import scramble from './components/scramble';

require('dotenv').config();


function App() {
    return (
        <Router basename="/">
          <Header/>
          <Route exact path='/' component={home}/>
          <Route exact path='/keywords' component={keywords}/>
          <Route exact path='/scramble' component={scramble}/>
        <div className="App">
        </div>
        <Footer/>
        </Router>
        // <>
        // <h1>Home</h1>
        // </>
    );
}

export default App;
