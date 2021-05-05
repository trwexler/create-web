import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import Register from '../components/Register';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';



const Edit = (props)=>{

    const [editUser, setEditUser] = useState({});
    const webList = [
        'Writer',
        'Writer - Looking for work!',
        'Editor',
        'Editor - Looking for work!',
        'Looking for team-writing',
        'Publisher',
        'Just browsing!',
        'Looking for feedback'
    ];

    useEffect(()=>{
        axios.get('http://localhost:8000/api/user/' + props.currentId)
            .then((res)=>{
                console.log(res.data);
                setEditUser(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])

    const submitHandler = (e)=>{
        e.preventDefault();
        axios.put('http://localhost:8000/api/user/' + props.currentId, editUser,
            {
                withCredentials: true
            })
            .then((res)=>{
                console.log(res.data);
                setEditUser(res.data);
                navigate(`/profile/${editUser._id}/${editUser._id}`)
            })
    }

    const inputChange = (e) => {
        let newStateObject = { ...editUser }; 
        newStateObject[e.target.name] = e.target.value;
        setEditUser(newStateObject);
    }

    return(
        <div>
            <form onSubmit={submitHandler}>

                <input onChange={inputChange} name="bio" 
                type="text" placeholder="bio" 
                value={editUser.bio}/>

                <select onChange={inputChange} 
                name="webs" 
                type="text" 
                placeholder="webs" 
                value={editUser.webs}>

                    <option value=""></option>
                    {
                        webList.map((web,index)=>(
                            <option value={web} key={'web'+index}>
                            {web}
                            </option>
                        ))
                    }

                </select>
                <br/>


                <input type="submit" value = "Update"/>

            </form>
        </div>
    )
}

export default Edit; 