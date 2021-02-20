import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './app/Navbar';
import AddPostForm from './features/posts/AddPostForm';
import PostsList from './features/posts/PostsList';
import SinglePostPage from './features/posts/SinglePostPage';
import EditPostForm from './features/posts/EditPostForm';
import UsersList from './features/users/UsersList';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">

        <Switch>
          <Route exact path="/" render={() => (
              <>
                <AddPostForm />
                <PostsList />
              </>
            )} 
          />
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/editPost/:postId" component={EditPostForm} />
          <Route exact path="/users" component={UsersList} />
          <Redirect to="/" />
        </Switch>

      </div>
    </Router>
    
  );
}

export default App;
