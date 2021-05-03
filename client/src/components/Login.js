import React, { useState } from "react";
import axios from "axios";
import { navigate } from '@reach/router';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

const login = event => {
    event.preventDefault();
    axios.post("http://localhost:8000/api/user/login", { 
        email: email, 
        password: password,
    },
    {
        withCredentials: true
    })
    .then((res) => {
        console.log(res.cookie);
        console.log(res);
        console.log(res.data, 'is res data!');
    })
    .catch(err => {
        console.log(err.response);
        setErrorMessage(err.response.data.message);
    });
};

return (
    <div>
        <h1 className="text-3xl font-bold p-2">Login</h1>
        <p className="error-text">{errorMessage ? errorMessage : ""}</p>
        <form onSubmit={login}>
        <div>
            <label className="px-5 font-semibold">Email</label>
            <input
            className="border rounded my-1"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div>
            <label className="px-5 font-semibold">Password</label>
            <input
            className="border rounded my-1" 
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <input className="m-3 p-4" type="submit"/>
        </form>
    </div>
    );
};

export default Login;