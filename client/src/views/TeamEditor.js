import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


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
            })
            .catch((err)=>{
                console.log(err);
            })

    }

return (
    <div>

        <h2>Using CKEditor 5 build in React</h2>


        <input type="text" name="name" 
        placeholder="Document Title" 
        onChange={handleChange} />

    <button onClick={handleNonFormSubmit}>Submit</button>
        
        <CKEditor
            name="content"
            editor={ ClassicEditor }
            data="<p>Hello from CKEditor 5!</p>"
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
