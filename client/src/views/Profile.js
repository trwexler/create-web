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
            <Header/>


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

                        <p>{userProfile.webs}</p>
                    </div>   
                </div>

            }

        </div>
    )
}


export default Profile;