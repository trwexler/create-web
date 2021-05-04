import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import Register from '../components/Register';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import like from '../components/like.svg';
import profilepic from '../components/profilepic.svg';
import Upload from '../components/Upload';




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


    const [newPost, setNewPost] = useState({
        content:"",
        likes:0,
        user_id: ""
    });

    //get single user
    const submitHandler = (e)=>{
        axios.post('http://localhost:8000/api/post',
        {
            withCredentials: true
        })
            .then((res)=>{
                console.log(res.data);
                setNewPost({
                    content:res.data.content,
                    likes:res.data.likes,
                    user_id: res.data.user_id
                });
            })
            .catch((err)=>{
                console.log(err);
            })
    }




    return(
        <div>
            <Header/>
            {/* will have to map through messages. This is format though: */}

            <form>
                <label>Share your latest with us!</label>
                <input type="text" name="post"/>
                <button>Post</button>
            </form>
            {
                post.map((aPost, index)=>(
                    <div className="flex flex-col border bg-gray-300 p-2 border-gray-400 border-t-2 border-b-2 m-1" key={index+aPost._id}>

                        <div className="flex">
                            <Link to={`/profile/${aPost.user_id._id}`}><img src={profilepic} className="w-10 m-1 border" alt="ProfilePic"/></Link>
                            <Link to={`/profile/${aPost.user_id._id}`}><p className="text-gray-500 font-semibold mt-2">{aPost.user_id.username}</p></Link>
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