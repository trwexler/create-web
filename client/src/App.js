import './App.css';
import React, {useState} from 'react';
import Main from './views/Main';
import Feed from './views/Feed';
import Profile from './views/Profile';
import {Router} from '@reach/router';
import Edit from './components/Edit';
import Webs from './views/Webs';


function App() {


  const [currentId, setCurrentId] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  


  return (
    <div className="App">

      <Router>
        <Main currentId={currentId} default/>
        <Feed currentUser={currentUser} setCurrentUser={setCurrentUser}path="/feed/:currentId"/>
        <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} path = "/profile/:profileId/:currentId"/>
        <Edit path="/edit/:currentId"/>
        <Webs currentId={currentId} setCurrentId={setCurrentId} path="/webs/:currentId"/>
        <Webs currentId={currentId} setCurrentId={setCurrentId} path="/webs/:currentId/:web"/>
      </Router>

    </div>
  );
}

export default App;
