import './App.css';
import Main from './views/Main';
import Feed from './views/Feed';
import Profile from './views/Profile';
import {Router} from '@reach/router';

function App() {
  return (
    <div className="App">
      <Router>
        <Main default/>
        <Feed path="/feed/:id"/>
        <Profile path = "/profile/:id"/>
      </Router>

    </div>
  );
}

export default App;
