import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
// import like from '../components/like.svg';
// import profilepic from '../components/profilepic.svg';
// import Upload from '../components/Upload';
import Edit from '../components/Edit';



const Profile = (props) =>{

    const {profileId} = props;
    const [userProfile, setUserProfile] = useState({});
    const [webList, setWebList] = useState([]);
    const [comments, setComments] = useState([]);

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
    },[])



    useEffect(()=>{
        axios.get('http://localhost:8000/api/user/' + profileId)
            .then((res)=>{
                console.log(res.data);
                setUserProfile(res.data);
                console.log(res.data.webs);
                setWebList(res.data.webs);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])




    return(
        <div>
            <Header id={props.currentId}/>

            {
                //Will run if the user is on his/her own page
                props.profileId == props.currentId
                ?
                <div>
                    <div className="bg-white shadow">
                        <img src="" alt=""/>
                        <h2 className="text-2xl p-3">Welcome home! {userProfile.username}</h2>
                        <p className="text-sm">{userProfile.bio}</p>
                        <button onClick={(e)=>navigate(`/edit/${props.currentId}`)}>Edit</button>
                    </div>
                    <div className="bg-white w-5/6 border mx-auto p-2 my-3 rounded shadow">
                        <h3 className="text-xl p-3">Your Webs</h3>

                {/* Runs if user is on his/her own page and hasn't added webs. */}
                        {
                            props.profileId == props.currentId
                            && userProfile.webs == "" ?
                            <p>Add to your webs!</p>
                            :null
                        }
                        
                        {
                            webList.map((web, index)=>(
                                <p className="block">{web}</p>
                            ))
                        }

                        {/* <p>{userProfile.webs}</p> */}



                        <button onClick={(e)=>navigate(`/edit/${props.currentId}`)}>Edit</button>
                    </div>
                </div>
                
                //Runs if user is NOT on their page
                :
                
                <div>
                    <div className="bg-white shadow">
                        <img src="" alt=""/>
                        <h2 className="text-2xl p-3">{userProfile.username}</h2>
                        <p className="text-sm">{userProfile.bio}</p>
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
                                <p key={index}className="block">{web}</p>
                            ))
                        }
                    </div>   
                </div>
            }


            <div>

                {/* {
                    comments.map((comment, index)=>(
                        <p key={index}>{comment.content}
                        {comment.posting_username}</p>
                    ))
                } */}

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


// useEffect(()=>{
//     axios.get('http://localhost:8000/api/user/' + props.currentId)
//         .then((res)=>{
//             console.log(res.data);
//             setCurrentUser({
//                 username:res.data.username,
//                 id:props.currentId,
//             });
//             console.log(currentUser);
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
// }, [])




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
// },[])

// useEffect(()=>{
//     axios.get('http://localhost:8000/api/user/' + profileId)
//         .then((res)=>{
//             console.log(res.data);
//             console.log(props.currentId);
//             setUserProfile(res.data);
//             console.log(res.data.webs);
//             setWebList(res.data.webs);
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
// }, [])






// const submitHandler = (e)=>{
//     e.preventDefault();
//     axios.post('http://localhost:8000/api/comment', newComments,
//     {
//         withCredentials: true
//     })
//         .then((res)=>{
//             console.log(res.data);

//            setNewComments({
//                content:"",
//                likes:0,
//                 posting_user_id: "",
//                profile_user_id: "",
//                posting_username: ""
//            })
// // //new.. need to check

//             let fullCommentList = [...comments, 
                
//                 {content: newComments.content, 
//                     likes:0, 
//                     posting_user_id: props.currentId,
//                     profile_user_id: profileId, 
//                     username: currentUser.username,
//                     posting_username: currentUser.username
//                 }];

//             setComments(fullCommentList); 
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
// }

// const handleChange = (e) => {
//     setNewComments({
//         ...newComments,
//         [e.target.name]: e.target.value,
//     })
// }




// <form onSubmit={submitHandler}>
// <label className="m-2">Share your latest with us!</label>
// <input onChange={handleChange} value={newComments.content} type="text" name="content"/>
// <br/>
// <button className="mx-auto my-3 p-3 rounded shadow-md w-24">Post</button>
// </form>




