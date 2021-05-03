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
            <h1 className="text-3xl font-bold p-2">Register</h1>
            <p className="text-sm font-semibold">Start Creating and collaborating today!</p>
            {
                confirmReg ? 
                <h4 className="text-green-300">{confirmReg}</h4>
                : null
            }

            <form onSubmit={submitHandler}>

                <label className="px-5 font-semibold">Email</label>
                <input className="border rounded my-1" type="text" name="email" value={newUser.email}
                    onChange={handleChange}
                />

                <label className="px-5 font-semibold">Username</label>
                <input className="border rounded my-1" type="text" name="username" value={newUser.username}
                    onChange={handleChange}
                />

                <label className="px-5 font-semibold">Password</label>
                <input className="border rounded my-1" type="text" name="password" value={newUser.password}
                    onChange={handleChange}
                />

                <label className="px-5 font-semibold">Confirm Password</label>
                <input className="border rounded my-1" type="text" name="confirmPassword" value={newUser.confirmPassword}
                    onChange={handleChange}
                />

                <input className="m-3 p-4" type="submit" value="Register"/>

            </form>


        </>
    )
}

export default Register; 

