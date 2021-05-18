import React from 'react';
import home from './home.svg';
import toggle from './toggle.svg';
import {navigate, Link} from '@reach/router';
import axios from 'axios';




const Header = (props)=>{


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
            <nav className="bg-gray-100 py-2">
                <span className="absolute right-5 
                top-0 mt-1 text-lg hover:text-blue-200 hover:underline 
                cursor-pointer" 
                onClick={(e) => logout(e) }>Logout
                </span>
                <ul className="flex justify-between px-4 py-3">

                    {/* mobile home icon */}
                    <Link to={`/feed/${props.id}`}> <img className="md:hidden lg:hidden w-10 mt-4" src={home}  alt=""/></Link>
                    
                    {/* CreateWeb Logo */}
                    <h1 className="md:mx-0 cursor-default text-3xl mx-auto p-2 mt-2">create(Web)</h1>
                    
                    <Link to={`/feed/${props.id}`}>
                    <li className="hidden md:flex mt-6 hover:text-blue-200 hover:underline cursor-pointer">Home</li></Link>

                    <Link to={`/profile/${props.id}/${props.id}`}>
                    <li className="hidden md:flex mt-6 hover:text-blue-200 hover:underline cursor-pointer">Profile</li></Link>

                    <Link to={`/webs/${props.id}`}>
                    <li className="hidden md:flex mt-6 hover:text-blue-200 hover:underline cursor-pointer">Webs</li></Link>

                    <Link to={`/teameditor/${props.id}`}>
                    <li className="hidden md:flex mt-6 hover:text-blue-200 hover:underline cursor-pointer">Write</li></Link>

                    <Link to={`/alldocs/${props.id}`}>
                    <li className="hidden md:flex mt-6 hover:text-blue-200 hover:underline cursor-pointer">Collection</li></Link>

                    <div className="relative cursor-pointer inline-block text-left">
                    
                        <img src={toggle} onClick={menuHandler} 
                        className="md:hidden text-sm mt-2 w-14" id="options-menu"/>
                        

                        <div id="mobileMenu" className="hidden z-40 origin-top-right 
                        absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white 
                        dark:bg-gray-800 ring-1 ring-black ring-opacity-5">

                            <div className="py-1 " role="menu" 
                            aria-orientation="vertical" aria-labelledby="options-menu">

                                <Link to={`/feed/${props.id}`} 
                                className="block px-4 py-2 text-md text-gray-700 
                                hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 
                                dark:hover:text-white dark:hover:bg-gray-600" role="menuitem"> 
                                    <span className="flex flex-col">
                                        <span>
                                            Home
                                        </span>
                                    </span>
                                </Link>

                                <Link to={`/profile/${props.id}/${props.id}`} className="block block px-4 py-2 text-md text-gray-700 
                                hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 
                                dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                                    <span className="flex flex-col">
                                        <span>
                                            Profile
                                        </span>
                                    </span>
                                </Link>

                                <Link to={`/webs/${props.id}`} className="block block px-4 py-2 text-md text-gray-700 
                                hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100
                                dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                                    <span className="flex flex-col">
                                        <span>
                                            Webs
                                        </span>
                                    </span>
                                </Link>

                                <Link to={`/teameditor/${props.id}`} className="block block px-4 py-2 text-md text-gray-700 
                                hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100
                                dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                                    <span className="flex flex-col">
                                        <span>
                                            Write
                                        </span>
                                    </span>
                                </Link>

                                <Link to={`/alldocs/${props.id}`} className="block block px-4 py-2 text-md text-gray-700 
                                hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100
                                dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                                    <span className="flex flex-col">
                                        <span>
                                            Collection
                                        </span>
                                    </span>
                                </Link>

                            </div>

                        </div>
                    </div>
                </ul>
            </nav>
        </>
    )
}

export default Header; 


