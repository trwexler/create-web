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
        console.log(res.data.userLoggedIn._id, 'is res data!');
        navigate(`/feed/${res.data.userLoggedIn._id}`);
    })
    .catch(err => {
        console.log(err.response);
        setErrorMessage(err.response.data.message);
    });
};

return (
    <div>
        <h1 className="text-4xl  p-2">create(Web)</h1>
        <p className="error-text">{errorMessage ? errorMessage : ""}</p>
        <form className="flex flex-col bg-white w-9/12 mx-auto my-4 p-5 shadow rounded" onSubmit={login}>
        <div>
            <input
            className="border rounded my-1"
            placeholder="Email"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div>
            <input
            className="border rounded my-1" 
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <input className="mx-auto my-3 p-3 rounded shadow-md w-24" type="submit" value="Login"/>
        </form>
    </div>
    );
};

export default Login;