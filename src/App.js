import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddPostForm from './components/posts/AddPostForm';
import PostsList from './components/posts/PostsList';
import SinglePostPage from './components/posts/SinglePostPage';
import EditPostForm from './components/posts/EditPostForm';
import UsersList from './components/users/UsersList';
import UserPage from './components/users/UserPage';
import NotificationsList from './components/notifications/NotificationsList';


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
          <Route exact path="/users/:userId" component={UserPage} />
          <Route exact path="/notifications" component={NotificationsList} />
          <Redirect to="/" />
        </Switch>

      </div>
    </Router>
    
  );
}

export default App;
