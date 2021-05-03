import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';




const Register = (props)=>{

    const [confirmReg, setConfirmReg] = useState("");
    const [errs, setErrs] = useState({});

    const [newUser, setNewUser] = useState({
        email:"",
        username:"",
        password:"",
        confirmPassword:""
    });

    
    const submitHandler = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/user/register', newUser,{
            withCredentials: true,
        })
            .then((res)=>{
                console.log(res);
                console.log(res.data)

                setNewUser({
                    email:"",
                    username:"",
                    password:"",
                    confirmPassword:""
                })
                setConfirmReg("Thank you for Registering, you can now log in!");
                setErrs({});  // remember to reset errors state if it was successful
                
            })

            .catch((err)=>{
                console.log(err);
                setErrs(err.response.data.errors);
            })
    }

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        })
    }



    return(
        <>
            <h1 className="text-3xl p-2">new here?</h1>
            <p className="text-sm font-semibold">Register and start creating and collaborating today!</p>
            {
                confirmReg ? 
                <h4 className="text-green-300">{confirmReg}</h4>
                : null
            }

            <form className="flex flex-col bg-white w-9/12 my-2 mx-auto p-5 shadow rounded" onSubmit={submitHandler}>

                <input className="border rounded my-1" placeholder="Email" type="text" name="email" value={newUser.email}
                    onChange={handleChange}
                />

                <input className="border rounded my-1" placeholder="Username" type="text" name="username" value={newUser.username}
                    onChange={handleChange}
                />

                <input className="border rounded my-1" placeholder="Password" type="password" name="password" value={newUser.password}
                    onChange={handleChange}
                />

                <input className="border rounded my-1" placeholder="Confirm Password" type="password" name="confirmPassword" value={newUser.confirmPassword}
                    onChange={handleChange}
                />
                <br/>

                <input className="mx-auto my-3 p-3 rounded shadow-md w-24" type="submit" value="Register"/>

            </form>


        </>
    )
}

export default Register; 

