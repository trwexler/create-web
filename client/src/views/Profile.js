import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
// import like from '../components/like.svg';
// import profilepic from '../components/profilepic.svg';
// import Upload from '../components/Upload';
import Edit from '../components/Edit';
import Upload from '../components/Upload';

const Profile = (props) =>{

    const {profileId} = props;
    const [userProfile, setUserProfile] = useState({});
    const [webList, setWebList] = useState([]);
    const [comments, setComments] = useState([]);
    const [currentUser, setCurrentUser] = useState({
    });

    

    useEffect(()=>{
        axios.get('http://localhost:8000/api/user/' + profileId,
        {
            withCredentials: true
        })
            .then((res)=>{
                console.log(profileId);
                console.log(res.data);
                setUserProfile({
                    username:res.data.username,
                    email:res.data.email,
                    profilePicture:res.data.profilePicture,
                    bio:res.data.bio,
                    webs:res.data.webs,
                    posts:res.data.posts,
                    comments:res.data.comments
                });
                console.log(res.data.webs);
                console.log("profiles won't update when switching between",
                userProfile);
                setWebList(res.data.webs);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [props.currentId, profileId])


    useEffect(()=>{
        axios.get('http://localhost:8000/api/comment/' + profileId,
        {
            withCredentials: true
        })
            .then((res)=>{
                console.log(res.data);
                setComments(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    },[props.currentId, profileId])


    useEffect(()=>{
    axios.get('http://localhost:8000/api/user/' + props.currentId,{
        withCredentials: true
    })
        .then((res)=>{
            console.log(res.data);
            setCurrentUser({
                username:res.data.username,
                _id:props.currentId,
                profilePicture: res.data.profilePicture
            });
            console.log(props.currentId);
            console.log(currentUser);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [props.currentId, profileId])


const [newComments,setNewComments] = useState({
    content:"",
    likes:0,
    posting_user_id: props.currentId,
    profile_user_id: profileId, 
    username: userProfile.username,
    posting_username: currentUser.username
})


const submitHandler = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:8000/api/comment', newComments,
    {
        withCredentials: true
    })
        .then((res)=>{
            console.log(res.data);

        setNewComments({
            content:"",
            likes:0,
            posting_user_id: props.currentId,
            profile_user_id: profileId, 
            username: currentUser.username,
            posting_username: currentUser.username
        })
// //new.. need to check

            let fullCommentList = [...comments, 
                
                {content: newComments.content, 
                    likes:0, 
                    posting_user_id: props.currentId,
                    profile_user_id: profileId, 
                    username: currentUser.username,
                    posting_username: currentUser.username
                }];

            setComments(fullCommentList); 
        })
        .catch((err)=>{
            console.log(err);
        })
}

const handleChange = (e) => {
    setNewComments({
        ...newComments,
        [e.target.name]: e.target.value,
        posting_username: currentUser.username
    });
}


    return(
        <div>
            <Header id={props.currentId}/>

            {
                //Will run if the user is on his/her own page
                props.profileId == props.currentId
                ?


                <div>
                <Upload currentId={props.currentId} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
                    <div className="bg-white shadow">
                        <img src="" alt=""/>
                        <h2 className="text-2xl p-3 font-mono">Welcome home, {userProfile.username}!</h2>
                        <p className="text-sm p-3">{userProfile.bio}</p>
                        <button onClick={(e)=>navigate(`/edit/${props.currentId}`)}>Edit</button>
                    </div>
                    <div className="bg-white w-5/6 border mx-auto p-4 my-3 rounded shadow">
                        <h3 className="text-left text-xl pb-3">Your Webs</h3>
                        <hr/>

                {/* Runs if user is on his/her own page and hasn't added webs. */}
                        {
                            props.profileId == props.currentId
                            && userProfile.webs == "" ?
                            <p>Add to your webs!</p>
                            :null
                        }

                        <div className="flex flex-wrap mt-3">
                        {
                            webList.map((web, index)=>(
                                <p onClick={(e)=>navigate(`/webs/${props.currentId}/${web}`)} 
                                key={index} className="p-3 m-1 rounded-3xl border shadow flex flex-wrap">{web}</p>
                            ))
                        }
                        </div>

                        {/* <p>{userProfile.webs}</p> */}



                        <button onClick={()=>navigate(`/edit/${props.currentId}`)}>Edit</button>
                    </div>
                </div>
                
                //Runs if user is NOT on their page
                :
                
                <div>
                    <div className="bg-white shadow">
                        <img src="" alt=""/>
                        <h2 className="text-2xl p-3">{userProfile.username}</h2>
                        <p className="text-sm p-3">{userProfile.bio}</p>
                    </div>
                    <div className="bg-white w-5/6 border mx-auto p-2 my-3 rounded shadow">
                        <h3 className="text-xl p-3">{userProfile.username}'s webs!</h3>
                {/* Runs if user is not on their page
                and they haven't added any webs. */}
                        {
                            props.profileId !== props.currentId
                            && userProfile.webs == "" ?
                            <p>{userProfile.username} hasn't added any webs yet!</p>
                            :null
                        }

                        {
                            webList.map((web, index)=>(
                                <p onClick={(e)=>navigate(`/webs/${props.currentId}/${web}`)} key={index} className="block">{web}</p>
                            ))
                        }
                    </div>   
                </div>
            }

            <form onSubmit={submitHandler}>
                <label className="m-2">Share your latest with us!</label>
                <br/>
                <input onChange={handleChange} value={newComments.content} type="text" name="content"/>
                <br/>
                <button className="mx-auto my-3 p-3 rounded shadow-md w-24">Post</button>
            </form>

            <div className="flex flex-col-reverse">
                {
                    comments.map((comment, index)=>(
                        <div className="flex flex-col shadow bg-gray-300 p-2 rounded m-2" key={index}>
                        
                        
                    <Link className="inline w-auto" to={`/profile/${comment.posting_user_id}/${props.currentId}`}><p className="inline w-auto text-gray-500 font-semibold mt-2 ">

                    {comment.posting_username}
                    </p></Link>

                    <p className="text-gray-500 font-semibold mt-2">
                    {comment.content}</p>
                    <p className="text-gray-500 font-semibold mt-2">
                    {comment.createdAt}</p>
                </div>
                    ))
                }
            </div>

        </div>
    )
}


export default Profile;










// const {profileId} = props;
// const [userProfile, setUserProfile] = useState({});
// const [webList, setWebList] = useState([]);
// const [comments, setComments] = useState([]);
// const [currentUser, setCurrentUser] = useState({});
// const [newComments, setNewComments] = useState({});












// <form onSubmit={submitHandler}>
// <label className="m-2">Share your latest with us!</label>
// <input onChange={handleChange} value={newComments.content} type="text" name="content"/>
// <br/>
// <button className="mx-auto my-3 p-3 rounded shadow-md w-24">Post</button>
// </form>




