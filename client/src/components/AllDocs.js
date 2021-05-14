import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


const AllDocs = (props) =>{
            //Basis for view page

        const [documentList, setDocumentList] = useState([]);

        const transform = (node) => {
            for(let i = 0 ; i<node.length; i++){
                if (node[i].type === 'string' && node[i].name === 'p') {
                    console.log("woroking");
                    return null;
                  }
                  else{
                      console.log(node[i]);
                  }
            }
          }

          useEffect(()=>{
            let docContent = document.getElementsByClassName('docContent');
            transform(docContent);
            }, [])

        


        useEffect(()=>{
            //this id prop will change depending on where the current
            //user is coming from. Most likely a User's Profile,
            //in which case it'd be profileId.
            //? For now I will use Tommy's Id for set up:
            axios.get('http://localhost:8000/api/document/user/' + "609aae2ce5e2d8390010400f",{
                withCredentials: true
            })
                .then((res)=>{
                    console.log(res.data);
                    setDocumentList(res.data);
                })
                .catch((err)=>{
                    console.log(err);
                })
            }, [])






    return(
        <div>
            {/* <div id="docContent" value={documents.content}></div> */}

            {
                documentList.map((item, index)=>(
                    <div className="docContent" key={index} value={item.content}>{item.content}</div>

                ))
            }



        </div>

    )
}

export default AllDocs;

