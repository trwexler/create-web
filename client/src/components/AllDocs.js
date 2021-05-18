import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


const AllDocs = (props) =>{
            //Basis for view page

        const [documentList, setDocumentList] = useState([]);
        const {id, currentId} = props;
        const [userName, setUserName] = useState("");


        useEffect(()=>{
            //this id prop will change depending on where the current
            //user is coming from. Most likely a User's Profile,
            //in which case it'd be profileId.
            //? For now I will use Tommy's Id for set up:
            axios.get('http://localhost:8000/api/document/user/' + id,{
                withCredentials: true
            })
                .then((res)=>{
                    console.log(res.data);
                    console.log(currentId);
                    setDocumentList(res.data);
                })
                .catch((err)=>{
                    console.log(err);
                })
            }, [])

            useEffect(()=>{
                axios.get('http://localhost:8000/api/user/' + id,{
                    withCredentials: true
                })
                    .then((res)=>{
                        console.log(res.data);
                        setUserName(res.data.username);
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },[])




        const clickHandler = (e)=>{
            let siblingNode = e.target;
    
            if (siblingNode.nextElementSibling.style.display === "block") {
                siblingNode.nextElementSibling.style.display = "none";
                // x.style.transition = ".5s" ;
                // y.style.transform = "rotate(0deg)" ;
                // y.style.transition = "1s" ;
            } else {
                siblingNode.nextElementSibling.style.display = "block";
                // x.style.transition = ".5s" ;
                // y.style.transform = "rotate(90deg)" ;
                // y.style.transition= "1s" ;
            }
    
        }


    return(
        <div>
            {/* <div id="docContent" value={documents.content}></div> */}
            <Header id={props.currentUser._id}/>
            <h1 className="text-2xl m-3">{userName}'s Collection</h1>
            <p>Click tiles to discover the story within.</p>
            <hr/>

            {
                documentList.map((item, index)=>
                (
                    <div className="mx-auto"
                    key={index}>
                        <button className="w-auto" onClick={clickHandler}>{item.name}</button>
                        <div className="hidden mx-3 px-5 py-2 md:px-10 md:py-5 text-left border" key={index}>
                        {ReactHtmlParser(item.content)}</div>
                    </div>
                    
                ))
            }

        </div>

    )
}

export default AllDocs;


// {
//     documentList.map((item, index)=>{
//         let str = item.content;
//         {/* str = str.toString(); */}
//         str = str.replace( /(<([^>]+)>)/ig, '');
//         console.log(str);
//         item.content = str;
//     (
//         <div className="docContent" key={index}>{item.content}</div>
//     )})
// }


