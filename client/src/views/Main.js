import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import Register from '../components/Register';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';



const Main = (props)=>{




    return(
        <div>
            {/* <Header/> */}
            <Login/>
            <Register/>
            
        </div>
    )
}

export default Main; 