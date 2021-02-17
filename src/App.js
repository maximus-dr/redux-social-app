import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './app/Navbar';
import PostsList from './features/posts/PostsList';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">

        <Switch>
          <Route exact path="/" render={() => (
              <PostsList />
            )} 
          />
          <Redirect to="/" />
        </Switch>

      </div>
    </Router>
    
  );
}

export default App;
