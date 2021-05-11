import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import like from '../components/like.svg';
import profilepic from '../components/profilepic.svg';
import Upload from '../components/Upload';




const Feed = (props)=>{


    const [post, setPost] = useState([]);
    const {currentUser, setCurrentUser} = props;

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


    

    useEffect(()=>{
        axios.get('http://localhost:8000/api/user/' + props.currentId)
            .then((res)=>{
                console.log(res.data);
                setCurrentUser(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])


    const [newPost, setNewPost] = useState({
        content:"",
        likes:0,
        user_id: "",
        username: ""
    });

    //get single user
    const submitHandler = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/post', newPost,
        {
            withCredentials: true
        })
            .then((res)=>{
                console.log(res.data.username);
                console.log(res.data._id);
                setNewPost({
                    content:"",
                    likes:0,
                    user_id: "",
                    username: ""
                })
//new.. need to check

                let fullPostList = [...post, {content: newPost.content, likes:0, user_id: res.data._id, username: res.data.username}];
                setPost(fullPostList); 



            })
            .catch((err)=>{
                console.log(err);
            })
    }

    const handleChange = (e) => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value,
        })
    }


    return(
        <div>
            <Header id={props.currentId}/>
            {/* will have to map through messages. This is format though: */}

            <form onSubmit={submitHandler}>
                <label className="m-2">Share your latest with us!</label>
                <input onChange={handleChange} value={newPost.content} type="text" name="content"/>
                <br/>
                <button className="mx-auto my-3 p-3 rounded shadow-md w-24">Post</button>
            </form>

            <div className="flex flex-col-reverse">
            {
            post.map((aPost, index)=>(
                
                <div className="flex flex-col border bg-gray-300 p-2 border-gray-400 border-t-2 border-b-2 m-1" key={index+aPost._id}>

                    <div className="flex">
                        <Link to={`/profile/${aPost.user_id._id}/${currentUser._id}`}><img src={profilepic} className="w-10 m-1 border" alt="ProfilePic"/></Link>

    {/* Fixed to allow user name to show upon change 
    (aPost.username) and remains in memory upon 
    refresh (aPost.user_id.username).
    Needs better solution.
    */}
                {

                aPost.username ?
                
                <Link to={`/profile/${aPost.user_id}/${currentUser._id}`}>
                <p className="text-gray-500 font-semibold mt-2">
                {aPost.username}
                </p></Link>
                
                :<Link to={`/profile/${aPost.user_id._id}/${currentUser._id}`}>
                <p className="text-gray-500 font-semibold mt-2">
                {aPost.user_id.username}
                </p></Link>

                }
                    </div>

                    <p className="text-sm text-left text-white p-2">{aPost.content}</p>

                    <div className="flex justify-center">
                        <p className=" m-1">Like</p>
                        <img className="w-4 m-1" src={like} alt="UPVOTE"/>
                    </div>
                </div> 
            ))}
            </div>
            
        </div>
    )
}

export default Feed; 