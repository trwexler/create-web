import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Header from '../components/Header';
import {navigate} from '@reach/router';


const TeamEditor = (props)=> {


    
    const {currentUser, setCurrentUser, currentId, setCurrentId} = props;

    const [documents, setDocuments] = useState({
        name:"",
        content:"",
        likes:0,
        user_id:currentId,
    });

    useEffect(()=>{
        axios.get('http://localhost:8000/api/user/' + currentId,{
            withCredentials: true
        })
            .then((res)=>{
                console.log(res.data);
                setCurrentUser(res.data);
                console.log(props.currentId);
            })
            .catch((err)=>{
                console.log(err);
            })
        }, [currentId])


    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        setDocuments({
            ...documents,
            [e.target.name]: e.target.value,
        });
        console.log(documents);
    }

    const handleNonFormSubmit = (e)=>{
        e.preventDefault();
        axios.post(`http://localhost:8000/api/document`, documents,{
            withCredentials:true,
        })
            .then((res)=>{
                console.log(res.data);
                navigate(`/alldocs/${currentId}`);
            })
            .catch((err)=>{
                console.log(err);
            })

    }

return (
    <div>

        <Header id={currentId}/>

        <h2 className="text-2xl m-3">Writer's Corner</h2>


        <input className="mb-5" type="text" name="name" 
        placeholder="Your Title" 
        onChange={handleChange} />

        <button onClick={handleNonFormSubmit}>Submit</button>
        
        <CKEditor
            name="content"
            editor={ ClassicEditor }
            data="<p>Type away, enter a title and hit submit. It all starts with a single key-stroke, after all.</p>"
            onReady={ editor => {
                // You can store the "editor" and use when it is needed.
                console.log( 'Editor is ready to use!', editor );
            } }
            // onChange={ ( event, editor ) => {
            //     const data = editor.getData();
            //     console.log( { event, editor, data } );
            //     setDocument(editor.getData());
            //     console.log(document);
            // } }

            onChange={ ( e, editor ) => {
                const data = editor.getData();
                // let dataRemovedTags = data.replace( /(<([^>]+)>)/ig, '');
                console.log( { e, editor, data } );
                console.log(e.name, e.value);
                setDocuments({
                    ...documents,
                    content: data,
                });
                console.log(documents);
            } }
            onBlur={ ( e, editor ) => {
                console.log( 'Blur.', editor );
            } }
            onFocus={ ( e, editor ) => {
                console.log( 'Focus.', editor );
            } }
        />

        {/* <button onClick={(e)=>{setDocument(data)}}></button> */}

    </div>
);
}

export default TeamEditor;
