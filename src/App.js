import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './app/Navbar';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
            <section>
              <h2>Welcome to Redux Social App</h2>
            </section>
          )}>
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
