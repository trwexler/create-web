import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
// import like from '../components/like.svg';
// import profilepic from '../components/profilepic.svg';
// import Upload from '../components/Upload';
import Edit from '../components/Edit';

const Webs = (props) =>{

    const {profileId, currentId} = props;
    const [userProfile, setUserProfile] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [selectedWeb, setSelectedWeb] = useState("");
    const [userList, setUserList] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/web/` + props.web,{
            withCredentials:true
        })
            .then((res)=>{
                setUserList(res.data);
                console.log(res.data);
                console.log(currentId);
            })
            .catch((err)=>{
                console.log(err);
            })
    },[])


    const submitHandler = (e)=>{
        e.preventDefault();
        axios.get(`http://localhost:8000/api/user/web/` + selectedWeb,{
            withCredentials:true
        })
            .then((res)=>{
                setUserList(res.data);
                console.log(res.data);
                console.log(currentId);
                navigate(`/webs/${props.currentId}/${selectedWeb}`);
            })
            .catch((err)=>{
                console.log(err);
            })
    }



//currentId is not a prop passed through route here, so it needs to be gained another way.
return(
    <div>
        <Header id={props.currentId}/>



        <form className="border bg-white" onSubmit={submitHandler}>
        
        <h1 className="text-3xl my-3">Webs</h1>
            <select className="border p-3 m-2" name="web" id="">
                <option value="" disabled selected>Search by webs</option>
                <option onClick={(e)=>setSelectedWeb(e.target.value)} value="Writer">Writer</option>
                <option onClick={(e)=>setSelectedWeb(e.target.value)} value="Writer - Looking for work!">Writer - Looking for work!</option>
                <option onClick={(e)=>setSelectedWeb(e.target.value)} value="Editor">Editor</option>
                <option onClick={(e)=>setSelectedWeb(e.target.value)} value="Editor - Looking for work!">Editor - Looking for work!</option>
                <option onClick={(e)=>setSelectedWeb(e.target.value)} value="Looking for team-writing">Looking for team-writing</option>
                <option onClick={(e)=>setSelectedWeb(e.target.value)} value="Publisher">Publisher</option>
                <option onClick={(e)=>setSelectedWeb(e.target.value)} value="Just browsing!">Just browsing!</option>
                <option onClick={(e)=>setSelectedWeb(e.target.value)} value="Looking for feedback">Looking for feedback</option>
            </select>
            <br/>
            <input type="submit" value="Search"/>
        </form>
        {
            selectedWeb?
            <p className="text-2xl my-3">{selectedWeb}</p>
            :
            <p>Users</p>

        }
        

        <div>
            {
                userList.map((user, index)=>(

                <div>
                    {/* <p onClick={(e)=>navigate(`/profile/${user._id}/${props.currentId}`)}>{user.username}</p> */}



                        <div className="md:w-1/2 md:mx-auto 
                        sm:w-4/5 sm:mx-auto flex flex-col 
                        bg-gray-300 p-2 border-gray-400 
                        border-t-4 border-b-4 m-1 rounded" key={index}>
                        {/* Profile Picture/ username div */}
                            <div className="flex">

                                <Link to={`/profile/${user._id}/${props.currentId}`}>  

                                <img className="w-16 rounded-3xl"
                                src={`http://localhost:8000/${user.profilePicture}`}alt=""/>

                                </Link>
                                
                                <Link to={`/profile/${user._id}/${props.currentId}`}>
                                <p className="w-auto 
                                text-gray-500 
                                font-semibold mt-2 p-1 ">
                                {user.username}
                                </p>
                                </Link>

                            </div>

                            <p className="text-gray-500 
                            font-semibold mt-2">

                            {user.bio}
                            </p>

                        </div>
                </div>
                ))
            }
        </div>
    </div>



)}


export default Webs;
