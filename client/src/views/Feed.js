import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import like from '../components/like.svg';
import profilepic from '../components/profilepic.svg';
import Upload from '../components/Upload';
import LikeButton from '../components/LikeButton';




const Feed = (props)=>{


    const [post, setPost] = useState([]);
    const [postId, setPostId] = useState("");
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

                let fullPostList = [...post, {content: newPost.content, likes:0, user_id: res.data._id, 
                username: res.data.username}];
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


            <form onSubmit={submitHandler}>
                <label className="m-2">Share your latest with us!</label>
                <input onChange={handleChange} value={newPost.content} type="text" name="content"/>
                <br/>
                <button className="mx-auto my-3 p-3 rounded shadow-md w-24 hover:bg-blue-100">Post</button>
            </form>

            <div className="flex flex-col-reverse">
            
            {

            post.map((aPost, index)=>(
                
                <div className="md:w-1/2 md:mx-auto 
                sm:w-4/5 sm:mx-auto flex flex-col 
                bg-gray-300 p-2 border-gray-400 
                border-t-4 border-b-4 m-1 rounded" 
                key={index+aPost._id}>

                    <div className="flex">  
                    {/* allows a placeholder picture 
                    before db pic is loaded */}

                        {
                            aPost.user_id.profilePicture?

                            <Link to={`/profile/${aPost.user_id._id}/${currentUser._id}`}>    
                            <img className="w-16 my-2 rounded-3xl"
                            src={`http://localhost:8000/${aPost.user_id.profilePicture}`} alt=""/>
                            </Link>

                            :

                            <Link to={`/profile/${aPost.user_id}/${currentUser._id}`}>    
                            <img className="w-14 my-2 rounded-3xl"
                            src={profilepic} alt=""/>
                            </Link>
                        }


                        {/* Fixed to allow user 
                        name to show upon change 
                        (aPost.username) and remains 
                        in memory upon refresh 
                        (aPost.user_id.username).
                        Needs better solution.
                        */}

                        {

                        aPost.username ?
                        
                        <Link to={`/profile/${aPost.user_id}/${currentUser._id}`}>
                        <p className="text-gray-500 font-bold text-lg mt-2 p-2 hover:underline">
                        {aPost.username}
                        </p>
                        </Link>
                        
                        :<Link to={`/profile/${aPost.user_id._id}/${currentUser._id}`}>
                        <p className="text-gray-500 font-bold text-lg mt-2 p-2 hover:underline">
                        {aPost.user_id.username}
                        </p>
                        </Link>

                        }

                    </div>

                    <p className="text-md text-left text-white p-2">{aPost.content}</p>
                    <LikeButton likes={aPost.likes} post={post} 
                    aPost={aPost} setPost={setPost}  postId={aPost._id}/>

                    {
                        aPost.createdAt?
                        <p className="text-sm">{(new Date(aPost.createdAt)).toLocaleString("en-us")}</p>
                        :
                        <p>Posted a couple seconds ago...</p>
                    }


                </div> 
            ))}
            </div>
            
        </div>
    )
}

export default Feed; 