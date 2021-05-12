import react, {useState, useEffect} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
import like from '../components/like.svg';



const LikeButton = (props)=>{

    const {postId} = props;
    const {post, aPost, setPost, likes} = props;



    const likeHandler = (e)=>{
        axios.put('http://localhost:8000/api/edit/' + postId, post)
            .then((res)=>{
                console.log(res.data);
                console.log(post); 
                aPost.likes++;
                const postConstant = [...post];
                setPost(postConstant);
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    return(
        <div className="flex bg-gray-100 cursor-pointer mx-auto my-3 p-3 rounded shadow-md w-24"
        onClick={(e)=>likeHandler(postId)}>

                <img className="w-4" 
                
                src={like} alt="UPVOTE"/>
                <p className=" mx-1">Like</p>
                <p name="likes" value={aPost.likes} 
                >{aPost.likes}</p>

        </div>
    )
}


export default LikeButton;


