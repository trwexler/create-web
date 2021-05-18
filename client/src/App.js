import './App.css';
import React, {useState} from 'react';
import Main from './views/Main';
import Feed from './views/Feed';
import Profile from './views/Profile';
import {Router} from '@reach/router';
import Edit from './components/Edit';
import AllDocs from './components/AllDocs';
import Webs from './views/Webs';
import TeamEditor from './views/TeamEditor';



function App() {


  const [currentId, setCurrentId] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  


  return (
    <div className="App">

      <Router>

        <Main currentId={currentId} default/>

        <Feed currentUser={currentUser} 
        setCurrentUser={setCurrentUser} 
        path="/feed/:currentId"/>

        <Profile currentUser={currentUser} 
        setCurrentUser={setCurrentUser} 
        path = "/profile/:profileId/:currentId"/>

        <Edit path="/edit/:currentId"/>

        <Webs
        setCurrentId={setCurrentId} 
        path="/webs/:currentId"/>

        <Webs
        setCurrentId={setCurrentId} 
        path="/webs/:currentId/:web"/>

        <TeamEditor
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser} 
        setCurrentId={setCurrentId}
        path="/teameditor/:currentId" />

        <AllDocs currentId={currentId} 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser} 
        setCurrentId={setCurrentId}
        path="/alldocs/:id" />

      </Router>

    </div>
  );
}

export default App;
