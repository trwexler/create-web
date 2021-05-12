import react, {useState, useEffect} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';



const LikeButton = (props)=>{

    const {postId} = props;
    const {post, setPost, likes} = props;

    // const addOne = (postId)=>{


    // }


    const likeHandler = (e)=>{
        axios.put('http://localhost:8000/api/post/' + postId, post)
            .then((res)=>{
                console.log(res.data);
                const postConstant = [...post, res.data];
                setPost(postConstant);
                console.log(post); 
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    return(
        <>
            <button onClick={(e)=>likeHandler(postId)}>
            Like

            </button>

        </>
    )
}


export default LikeButton;