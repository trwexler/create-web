import './App.css';
import React, {useState} from 'react';
import Main from './views/Main';
import Feed from './views/Feed';
import Profile from './views/Profile';
import {Router} from '@reach/router';
import Edit from './components/Edit';


function App() {


  const [currentId, setCurrentId] = useState("");

  return (
    <div className="App">

      
  
    
    
    
      <Router>
        <Main default/>
        <Feed path="/feed/:currentId"/>
        <Profile path = "/profile/:profileId/:currentId"/>
        <Edit path="/edit/:currentId"/>
      </Router>

    </div>
  );
}

export default App;
