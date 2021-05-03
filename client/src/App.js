import './App.css';
import Main from './views/Main';
import Feed from './views/Feed';
import {Router} from '@reach/router';

function App() {
  return (
    <div className="App">
      <Router>
        <Main default/>
        <Feed path="/feed"/>
      </Router>

    </div>
  );
}

export default App;
