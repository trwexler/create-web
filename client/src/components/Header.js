import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import home from './home.svg';
import toggle from './toggle.svg';




const Header = (props)=>{




    return(
        <>
            <nav className="bg-gray-100">
                <ul className="flex justify-between p-5 border ">
                    <img className="w-10" src={home}  alt=""/>
                    <li className="hidden lg:flex border">2</li>
                    <li className="hidden lg:flex border">3</li>
                    <img className="lg:hidden w-7" src={toggle} alt=""/>
                </ul>
            </nav>
        </>
    )
}

export default Header; 