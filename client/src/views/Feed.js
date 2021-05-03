import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import Register from '../components/Register';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import like from '../components/like.svg';
import profilepic from '../components/profilepic.svg';




const Feed = (props)=>{

    const [post, setPost] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/post',
        {
            withCredentials: true
        })
            .then((res)=>{
                console.log(res.data);
                setPost(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    },[])


    return(
        <div>
            <Header/>
            {/* will have to map through messages. This is format though: */}

            {
                post.map((aPost, index)=>(
                    <div className="flex flex-col border bg-gray-300 p-2 border-gray-400 border-t-2 border-b-2" key={index+aPost._id}>

                        <div className="flex">
                            <img src={profilepic} className="w-10 m-1 border" alt="ProfilePic"/>
                            <p className="text-gray-500 font-semibold mt-2">{aPost.user_id.username}</p>
                        </div>

                        <p className="text-sm text-left text-white p-2">{aPost.content}</p>

                        <div className="flex justify-center">
                            <p className=" m-1">Like</p>
                            <img className="w-4 m-1" src={like} alt="UPVOTE"/>
                        </div>

                    </div>
                ))
            }






            
        </div>
    )
}

export default Feed; 