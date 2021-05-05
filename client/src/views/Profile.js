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


            {
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
                        <h3 className="text-xl p-3">Weave your webs!</h3>
                        <p>{userProfile.webs}</p>
                        <button onClick={(e)=>navigate(`/edit/${props.currentId}`)}>Edit</button>
                    </div>

                </div>

                :
                
                <div>
                    <div className="bg-white shadow">
                        <img src="" alt=""/>
                        <h2 className="text-2xl p-3">{userProfile.username}</h2>
                        <p className="text-sm">{userProfile.bio}</p>
                    </div>
                    <div className="bg-white w-5/6 border mx-auto p-2 my-3 rounded shadow">
                        <h3 className="text-xl p-3">{userProfile.username}'s webs!</h3>
                        <p>{userProfile.webs}</p>
                    </div>   
                </div>

            }

        </div>
    )
}


export default Profile;