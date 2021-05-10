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


        <h1>Webs!</h1>

        <form className="border bg-white" onSubmit={submitHandler}>
            <select className="border p-3 m-2" name="web" id="">
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
            <input type="submit"/>
        </form>
        {selectedWeb}

        <div>
            {
                userList.map((user, index)=>(
                    <p onClick={(e)=>navigate(`/profile/${user._id}/${props.currentId}`)}>{user.username}</p>
                ))
            }
        </div>
    </div>



)}


export default Webs;
