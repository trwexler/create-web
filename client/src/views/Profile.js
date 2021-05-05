import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import Register from '../components/Register';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import like from '../components/like.svg';
import profilepic from '../components/profilepic.svg';
import Upload from '../components/Upload';



const Profile = (props) =>{

    const {profileId} = props;
    const [userProfile, setUserProfile] = useState({});

    useEffect(()=>{
        axios.get('http://localhost:8000/api/user/' + profileId)
            .then((res)=>{
                console.log(res.data);
                setUserProfile(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])

    return(
        <div>
            <Header/>

            <div className="bg-white shadow">
                <img src="" alt=""/>
                <h2 className="text-2xl p-3">{userProfile.username}</h2>
                <p className="text-sm">{userProfile.bio}</p>
            </div>

            {
                props.profileId == props.currentId?
                <p>You are on your page!</p>
                :<p>You are not on your page!</p>

            }

            <div className="bg-white w-5/6 border mx-auto p-2 my-3 rounded shadow">
                <h3 className="text-xl p-3">Weave your webs!</h3>
                <p>{userProfile.webs}</p>

                
            </div>            

        </div>
    )
}


export default Profile;