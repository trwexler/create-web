import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import axios from 'axios';
import {Link, navigate, Router} from '@reach/router';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


const AllDocs = (props) =>{
            //Basis for view page

        const [documentList, setDocumentList] = useState([]);

        // const transform = (node) => {
        //     for(let i = 0 ; i<node.length; i++){
        //         if (node[i].type === 'string' && node[i].name === 'p') {
        //             console.log("woroking");
        //             return null;
        //         }
        //         else{
        //             console.log(node[i]);
        //         }
        //     }
        // }

        // function removeTags(str) {
        //     if ((str===null) || (str==='')){
        //         return false;
        //     }

        //     else{
        //         str = str.toString();
        //         return str.replace( /(<([^>]+)>)/ig, '');
        //     }

        // }

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

        // useEffect(()=>{
        //     let docContent = document.getElementsByClassName('docContent');


        //     for(let i =0; i<docContent.length;i++){
        //         // docContent[i]["__reactProps$waol63jr44j"].children = docContent[i].toString();
        //         docContent[i]["__reactProps$waol63jr44j"].children.replace( /(<([^>]+)>)/ig, '');
        //         console.log(docContent[i]["__reactProps$waol63jr44j"].children);
        //     }

            

        //     }, [])




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

            {
                documentList.map((item, index)=>
                (
                    <div className="w-1/2 mx-auto">
                        <button onClick={clickHandler}>{item.name}</button>
                        <p className="hidden m-20" key={index}>
                        {ReactHtmlParser(item.content)}</p>
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


