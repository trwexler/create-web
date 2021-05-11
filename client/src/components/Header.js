import React from 'react';
import home from './home.svg';
import toggle from './toggle.svg';
import {navigate, Link} from '@reach/router';
import axios from 'axios';




const Header = (props)=>{

    //Cookie “usertoken” has been rejected because it is already expired.
    const logout = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/user/logout", { 
        }, {
        withCredentials: true,
        })
        .then((res) => {
        console.log(res.data);
        navigate("/");
        })
        .catch(err => {
        console.log(err);
        });
    };


    return(
        <>
            <nav className="bg-gray-100 ">
                <button onClick={(e) => logout(e) }>Logout</button>
                <ul className="flex justify-between px-4 py-3">

                    <Link to={`/feed/${props.id}`}> <img className="w-10 mt-2" src={home}  alt=""/></Link>
                    {/* <li className="hidden lg:flex border">2</li>
                    <li className="hidden lg:flex border">3</li> */}
                    <h1 className="text-3xl  p-2">create(Web)</h1>
                    <img className="lg:hidden w-7 mb-" src={toggle} alt=""/>
                </ul>
            </nav>
        </>
    )
}

export default Header; 


