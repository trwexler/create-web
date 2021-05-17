import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


const AllDocs = (props) =>{
            //Basis for view page

        const [documentList, setDocumentList] = useState([]);
        const {id, currentId} = props;


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

            {
                documentList.map((item, index)=>
                (
                    <div className="w-1/2 mx-auto"
                    key={index}>
                        <button onClick={clickHandler}>{item.name}</button>
                        <div className="hidden m-20" key={index}>
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


