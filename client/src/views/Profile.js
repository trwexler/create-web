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

    const {id} = props;
    const [user, setUser] = useState({});

    useEffect(()=>{
        axios.get('http://localhost:8000/api/user/' +props.id)
            .then((res)=>{
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])

    return(
        <div>
            <Header/>
            {/* <img src={user.profilePicture} alt=""/> */}

            <div>
                {user.bio}

            </div>
            

        </div>
    )
}


export default Profile;