import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const Upload = (props)=> {
    // storing the uploaded file 
    const [file, setFile] = useState('');   
    // storing the recived file from backend
    const [data, getData] = useState({ name: "", path: "" });    
    const fileInput = useRef(); // accesing input element
    const {setCurrentUser, currentUser, currentId } = props;
    const [changePic, setChangePic] = useState({
        ...currentUser,
        profilePicture:""
    })


    const handleInputChange = (e) => {
        // setProgess(0)
        const file = e.target.files[0]; // accessing file
        console.log(file);
        setFile(file); // storing file
        console.log(e.target.name, e.target.value);
        setChangePic({
            ...currentUser,
            [e.target.name]:e.target.value,
        });
    }

    const uploadFile = () => {
        const formData = new FormData();        
        formData.append('file', file); // appending file
        axios.put('http://localhost:8000/api/user/upload/' + currentId, formData, {
            withCredentials:true
        }
        
        ).then(res => {
            console.log(res.data);
            
            getData({ name: res.data.name,
                path: 'http://localhost:8000/' + res.data.path
            })

            setChangePic({
                ...currentUser,
                profilePicture: 'http://localhost:8000/' + res.data.path
            })
            setCurrentUser({
                ...currentUser,
                profilePicture: 'http://localhost:8000/' + res.data.path
            })
            console.log(res.data.path);
            console.log(currentUser);
        })
        .catch(err => console.log(err))}

    return (
        <div>

            

            <div className="file-upload">

                <input ref={fileInput} type="file" name="profilePicture"  onChange={handleInputChange} />   

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