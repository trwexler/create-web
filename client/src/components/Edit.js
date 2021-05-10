import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
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
        axios.get('http://localhost:8000/api/user/' + props.currentId,{
            withCredentials:true
        })
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


    const checkBoxChange= (e) => {
        let newCheckBox = { ...editUser };
        let webPresent = editUser.webs.indexOf(e.target.value);


        if(webPresent == -1){
            console.log(webPresent);
            newCheckBox[e.target.name].push(e.target.value);
            setEditUser(newCheckBox);
        }
        else{
            console.log(webPresent);

        }
    }


    return(
        <div>

        <Header id={props.currentId}/>
            <form onSubmit={submitHandler}>

                <input onChange={inputChange} name="bio" 
                type="text" placeholder="bio" 
                value={editUser.bio}/>

                {/* <label onChange={inputChange} 
                name="webs" 
                value={editUser.webs}> */}
                {
                    webList.map((webs,index)=>(
                        <div> 
                        <input onChange={checkBoxChange} type="checkbox" name="webs" 
                        value={webs} key={'webs'+index}/>
                        {webs}</div>
                    ))
                }


                <br/>


                <input type="submit" value = "Update"/>

            </form>
        </div>
    )
}

export default Edit; 