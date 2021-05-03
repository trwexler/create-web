import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import Register from '../components/Register';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import like from '../components/like.svg';
import profilepic from '../components/profilepic.svg';




const Feed = (props)=>{

    const [post, setPost] = useState([{
        user:"",
        message:"",
        picture:""
    }]);


    return(
        <div>
            <Header/>
            {/* will have to map through messages. This is format though: */}
            <div className="flex flex-col border bg-gray-300 p-2 border-gray-400 border-t-2 border-b-2">
                <div className="flex">
                    <img src={profilepic} className="w-10 m-1 border" alt="ProfilePic"/>
                    <p className="text-gray-500 font-semibold mt-2">UserName</p>
                </div>
                <p className="text-sm text-left text-white p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque fugit id obcaecati 
                nobis animi iure perspiciatis pariatur fugiat aspernatur, ipsam tempore alias 
                cupiditate, officia architecto vero repellendus optio dolores ratione.</p>

                <div className="flex justify-center">
                    <p className=" m-1">Like</p>
                    <img className="w-4 m-1" src={like} alt="UPVOTE"/>
                </div>
                
            </div>


            
        </div>
    )
}

export default Feed; 