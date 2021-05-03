import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import Register from '../components/Register';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';



const Main = (props)=>{




    return(
        <div>
            <Header/>
            <Register/>
            <Login/>
            {/* <Router>
            <Feed path="/feed"/>
            <UserPage path="user/:id"/>
            </Router> */}


        </div>
    )
}

export default Main; 