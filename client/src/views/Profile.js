import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
// import like from '../components/like.svg';
// import profilepic from '../components/profilepic.svg';
// import Upload from '../components/Upload';
import Edit from '../components/Edit';
import Upload from '../components/Upload';
// import TeamEditor from '../components/TeamEditor';


const Profile = (props) =>{

    const {profileId, currentUser, setCurrentUser, currentId} = props;
    const [userProfile, setUserProfile] = useState({});
    const [webList, setWebList] = useState([]);
    const [comments, setComments] = useState([]);    
    const [newComments,setNewComments] = useState({
        content:"",
        likes:0,
        posting_user_id: props.currentId,
        profile_user_id: profileId, 
        username: "",
        posting_username: "",
        posting_profilePicture: ""

    });

useEffect(()=>{
    setNewComments({
        ...newComments,
        posting_user_id: currentUser._id,
        profile_user_id: userProfile._id, 
        username: userProfile.username,
        posting_username: currentUser.username,
        posting_profilePicture: currentUser.profilePicture,

    })
},[userProfile, currentUser])



    //Getting profile User:
    useEffect(()=>{
        axios.get('http://localhost:8000/api/user/' + profileId,
        {
            withCredentials: true
        })
            .then((res)=>{
                console.log(profileId);
                console.log(res.data);
                setUserProfile(res.data);
                console.log(res.data.webs);
                setWebList(res.data.webs);
                setComments(res.data.comments);
                console.log(res.data.comments);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [profileId])


    //Getting profile User's comments:
    // useEffect(()=>{
    //     axios.get('http://localhost:8000/api/comment/' + profileId,
    //     {
    //         withCredentials: true
    //     })
    //         .then((res)=>{
    //             console.log(res.data);
    //             setComments(res.data);
    //         })
    //         .catch((err)=>{
    //             console.log(err);
    //         })
    // },[profileId])
    // Getting the logged in user:


useEffect(()=>{
axios.get('http://localhost:8000/api/user/' + props.currentId,{
    withCredentials: true
})
    .then((res)=>{
        console.log(res.data);
        setCurrentUser(res.data);
        console.log(props.currentId);
        console.log("logging currentUser...not quick enough",currentUser);
    })
    .catch((err)=>{
        console.log(err);
    })
}, [props.currentId])



const submitHandler = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:8000/api/comment', newComments,
    {
        withCredentials: true
    })
        .then((res)=>{
            console.log(res.data);
            setNewComments({
                ...newComments,
                content: ""
            })

            setComments(res.data.comments);
        })
        .catch((err)=>{
            console.log(err);
        })
}

const handleChange = (e) => {
    setNewComments({
        ...newComments,
        [e.target.name]: e.target.value,
        // posting_username: currentUser.username
    });
}

    return(
        <div>
            <Header id={props.currentId}/>
            
            {/* Conditional Render that determines
            whether a user is on his/her own 
            page or another user's */}



            {  
                //Will run if the user is on his/her own page
                props.profileId == props.currentId
                ?

                <div>

                    {/* Profile picture/Change picture section*/}
                    {/* <div className="rounded h-full shadow
                    mx-auto py-3 mx-2 mb-4 bg-white">
                        <Upload userProfile={userProfile} 
                        currentId={props.currentId} 
                        currentUser={currentUser} 
                        setCurrentUser={setCurrentUser}/>
                    </div>  */}

                    <div className="bg-white shadow mx-auto">

                        <h2 className="text-2xl p-3 font-mono">
                        Welcome home, {userProfile.username}!
                        </h2>

                        <div className="rounded h-full
                        mx-auto py-3 mx-2 mb-4 bg-white">
                            <Upload userProfile={userProfile} 
                            currentId={props.currentId} 
                            currentUser={currentUser} 
                            setCurrentUser={setCurrentUser}/>

                            <Link to={`/teameditor/${currentUser._id}`}>
                            <button className="m-3">
                            Get to writing!
                            </button>
                            </Link>

                            <Link to={`/alldocs/${profileId}`}>
                            <button className="m-3">
                            View All Writings!
                            </button>
                            </Link>

                            </div>
                            <p className="text-sm p-3">
                            {userProfile.bio}
                            </p>

                            <button 
                            onClick={(e)=>navigate(`/edit/${props.currentId}`)}>
                            Edit
                            </button>
                        


                    </div>
                    




                    {/* Webs Section */}
                    <div className="md:w-1/2 md:mx-auto 
                    sm:w-4/5 sm:mx-auto bg-white w-5/6 
                    border mx-auto p-4 my-3 rounded shadow">
                        <h3 className="text-left text-2xl pb-3">Your Webs</h3>
                        <hr/>
                        {/* Runs if user is on his/her own page 
                        and hasn't added webs. */}
                        {
                            props.profileId == props.currentId
                            && userProfile.webs == "" ?
                            <p>Add to your webs!</p>
                            :null
                        }

                        <div className="flex flex-wrap mt-3">

                        {
                            webList.map((web, index)=>(

                                <p onClick={(e)=>navigate(
                                `/webs/${props.currentId}/${web}`)} 
                                key={index} className="p-6 w-auto
                                cursor-pointer rounded-full m-1 mx-auto
                                border shadow text-xl hover:bg-blue-100 
                                focus:outline-none hover:text-white">
                                {web}
                                </p>

                            ))
                        }

                        </div>

                        {/* <p>{userProfile.webs}</p> */}
                        <button onClick={()=>navigate(`/edit/${props.currentId}`)}>Edit</button>
                    </div>
                {/* End if user is on own page */}
                </div> 
                
                //Runs if user is NOT on their page
                //No options to change pics/edit info
                //Changes some wording
                :
                <div>

                    <div className="bg-white shadow">

                        <img className="w-54 h-36 mx-auto mb-2 rounded-full"
                        src={`http://localhost:8000/image/${userProfile.profilePicture}`} alt=""/>

                        <h2 className="text-2xl p-3">{userProfile.username}</h2>
                        <Link to={`/alldocs/${userProfile._id}`}>
                        <button>
                        View All Writings!
                        </button>
                        </Link>

                        <p className="text-sm p-3">{userProfile.bio}</p>

                    </div>

                    <div className="md:w-1/2 md:mx-auto 
                    sm:w-4/5 sm:mx-auto bg-white w-5/6 
                    border mx-auto p-4 my-3 rounded shadow">
                        <h3 className="text-xl p-3">
                        {userProfile.username}'s webs!
                        </h3>

                        {/* Runs if user is not on their 
                        page and THEY DO NOT HAVE webs. */}
                        {
                            props.profileId !== props.currentId
                            && userProfile.webs == "" ?
                            <p>{userProfile.username} hasn't added any webs yet!</p>
                            :null
                        }

                        {/* Runs if user is not on their 
                        page and THEY DO HAVE webs. */}
                        <div className="flex flex-wrap mt-3">
                        {
                            webList.map((web, index)=>(
                                <p onClick={(e)=>navigate(
                                `/webs/${props.currentId}/${web}`)} 
                                key={index} className="p-6 w-auto
                                cursor-pointer rounded-full m-1
                                border shadow text-xl hover:bg-blue-100 focus:outline-none hover:text-white">
                                {web}
                                </p>
                            ))
                        }
                        </div>

                    </div>

                </div>
            }
            {/* End conditional render pre-comments section */}

            {/* COMMENT FORM */}
            <form onSubmit={submitHandler}>

                {
                props.profileId == props.currentId ?
                <label className="m-2 text-2xl">
                Share your latest with us!
                </label>
                :
                <label className="m-2 text-2xl">
                Write on {userProfile.username}'s wall!
                </label>

                }

                <br/>
                <input className="mt-5" onChange={handleChange} 
                value={newComments.content} 
                type="text" name="content"/>
                <br/>
                <button className="mx-auto my-3 
                p-3 rounded shadow-md w-24">
                Post
                </button>

            </form>

            {/* List of comments posted to profile user's page */}
            {/* Flex-col-reverse allows newest to be up top */}
            <div className="flex flex-col-reverse">
                {
                    comments.map((comment, index)=>(
                        
                        <div className="md:w-1/2 md:mx-auto 
                            sm:w-4/5 sm:mx-auto flex flex-col 
                            bg-gray-300 p-2 border-gray-400 
                            border-t-4 border-b-4 m-1 rounded" key={index}>
                            {/* Profile Picture/ username div */}
                            <div className="flex">

                                <Link to={`/profile/${comment.posting_user_id}/${currentUser._id}`}>  

                                <img className="w-16 rounded-3xl"
                                src={`http://localhost:8000/image/${comment.posting_profilePicture}`}alt=""/>

                                </Link>
                                
                                <Link to={`/profile/${comment.posting_user_id}/${props.currentId}`}>
                                <p className="w-auto 
                                text-gray-500 
                                font-semibold mt-2 p-1 ">
                                {comment.posting_username}
                                </p>
                                </Link>

                            </div>

                            <p className="text-gray-500 
                            font-semibold mt-2">
                            {comment.content}
                            </p>

                            <span className="text-gray-500 text-sm mt-2">
                            {(new Date(comment.createdAt)).toLocaleString("en-us")}
                            </span>

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




