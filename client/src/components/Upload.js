import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const Upload = (props)=> {
    // storing the uploaded file 
    const [file, setFile] = useState('');   
    // storing the recived file from backend
    const [data, getData] = useState({ name: "", path: "" });    
    const fileInput = useRef(); // accesing input element
    const {setCurrentUser, currentUser, currentId } = props;
        // const [progress, setProgess] = useState(0); // progess bar


    const handleInputChange = (e) => {
        // setProgess(0)
        const file = e.target.files[0]; // accessing file
        console.log(file);
        setFile(file); // storing file
        setCurrentUser({
            username: currentUser.username,
            _id:currentUser._id,
            profilePicture: file
        });
    }

    const uploadFile = () => {
        const formData = new FormData();        
        formData.append('file', file); // appending file
        axios.put('http://localhost:8000/api/user/upload/' + currentId, formData,{
            withCredentials:true
        }
        // ,{
        //     onUploadProgress: (ProgressEvent) => {
        //         let progress = Math.round(
        //         ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
        //         setProgess(progress);
        //     }
        // }
        
        ).then(res => {
            console.log(res.data);
            
            getData({ name: res.data.name,
                path: 'http://localhost:8000/' + res.data.path
            })
            setCurrentUser({
                username: currentUser.username,
                _id:currentUser._id,
                profilePicture:'http://localhost:8000/' + res.data.path,
            })
            console.log(res.data.path);
            console.log(currentUser);
        })
        .catch(err => console.log(err))}

    return (
        <div>
            <div className="file-upload">

                <input ref={fileInput} type="file" name="fileInput"  onChange={handleInputChange} />   

                {/* <div className="progessBar" style={{ width: progress }}>
                {progress}
                </div> */}
                <button onClick={uploadFile}>                   
                Upload
                </button>
            <hr />
            {/* displaying received image
            {data.path && <img src={data.path} alt={data.name} />} */}
            </div>
        </div>
    );
}

export default Upload;