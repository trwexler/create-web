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

    const menuHandler = (e)=>{
        let x = document.getElementById("mobileMenu");
        let y = document.getElementById("options-menu");

        if (x.style.display === "block") {
            x.style.display = "none";
            x.style.transition = ".5s" ;
            y.style.transform = "rotate(0deg)" ;
            y.style.transition = "1s" ;
        } else {
            x.style.display = "block";
            x.style.transition = ".5s" ;
            y.style.transform = "rotate(90deg)" ;
            y.style.transition= "1s" ;
        }

    }


    return(
        <>
            <nav className="bg-gray-100 ">
                <button onClick={(e) => logout(e) }>Logout</button>
                <ul className="flex justify-between px-4 py-3">
                    <Link to={`/feed/${props.id}`}> <img className="w-10 mt-2" src={home}  alt=""/></Link>
                    <h1 className="text-3xl  p-2">create(Web)</h1>
                    {/* <img className="lg:hidden w-7 mb-" src={toggle} alt=""/> */}
                    
<div className="relative cursor-pointer inline-block text-left">
    <div>
        <img src={toggle} onClick={menuHandler} className="py-1 text-sm  w-12" id="options-menu"/>

    </div>
    <div id="mobileMenu" className="hidden origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
    >
        <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="#" className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                <span className="flex flex-col">
                    <span>
                        Home
                    </span>
                </span>
            </a>
            <a href="#" className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                <span className="flex flex-col">
                    <span>
                        Profile
                    </span>
                </span>
            </a>
            <a href="#" className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                <span className="flex flex-col">
                    <span>
                        Webs
                    </span>
                </span>
            </a>
        </div>
    </div>
</div>
                </ul>
            </nav>
        </>
    )
}

export default Header; 


