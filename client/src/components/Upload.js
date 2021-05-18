import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import check from './check.svg';

const Upload = (props)=> {
    // storing the uploaded file 
    const [file, setFile] = useState('');   
    // storing the recived file from backend
    const [data, getData] = useState({ name: "", path: "" });    
    const profilePicture = useRef(); // accesing input element
    const {setCurrentUser, currentUser, currentId, userProfile } = props;
    const [changePic, setChangePic] = useState({
        ...currentUser,
        profilePicture:""
    })


    const handleInputChange = (e) => {
        // setProgess(0)
        const file = e.target.files[0]; // accessing file
        console.log(file);
        setFile(file); // storing file
        console.log(e.target.name, e.target.files[0]);
        setChangePic({
            ...currentUser,
            // [e.target.name]:e.target.files[0],
            [e.target.name]:e.target.files[0].name,
        });
    }

    const uploadFile = () => {
        const formData = new FormData();        
        formData.append('file', file); // appending file
        axios.put('http://localhost:8000/api/user/upload/' + currentId, formData, {
            withCredentials:true
        })
        .then(res => {
            console.log(res.data);
            getData({ name: res.data.name,
                path: 'http://localhost:8000/' + res.data.path
            })
            // setChangePic({
            //     ...currentUser,
            //     profilePicture: 'http://localhost:8000/' + res.data.path
            // })
            // setCurrentUser({
            //     ...currentUser,
            //     profilePicture: 'http://localhost:8000/' + res.data.path
            // })
            console.log(res.data.path);
            console.log(currentUser);
        })
        .catch(err => console.log(err))}


    return (

    <div>

        
        <img className="w-54 h-36 mx-auto my-2 rounded-3xl"
        src={`http://localhost:8000/${currentUser.profilePicture}`} 
        alt="Add a profile picture!"/>

        <div className="file-upload w-56 mx-auto h-full">

            <div className="h-10 relative w-56">
            
                <input className="z-0 absolute left-0 h-10 w-36 m-0 p-1 text-center placeholder-black 
                bg-white cursor-pointer" type="text" placeholder="Change Picture" />

                <input ref={profilePicture} 
                type="file" name="profilePicture"  
                onChange={handleInputChange}
                className="opacity-0 z-50 cursor-pointer absolute left-0 h-10 w-36 m-0 p-1" />  

                <button 
                className="p-0 m-0 w-16 absolute h-10 right-0" 
                onClick={uploadFile}>               
                Upload
                </button> 

            </div>





    </div> 

    {/* <div className="flex flex-col items-center justify-center bg-grey-lighter">

        <label className="w-22 flex flex-col items-center 
        px-4 pt-6 bg-white text-blue rounded-lg shadow-lg 
        tracking-wide uppercase border border-blue cursor-pointer 
        hover:bg-blue-200 hover:text-white">

            <svg className="w-8 h-8" fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 
                1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 
                17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>

            <span className="mt-2 text-base leading-normal">Update Picture</span>

            <input className="hidden"
            ref={profilePicture} type="file" name="profilePicture"  
            onChange={handleInputChange} />

        </label>

        <img onClick={uploadFile} className="w-6 mt-2 z-50" src={check} alt="" />

    </div> */}



</div>

)}

export default Upload;