import React, { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import CreateBlog from './components/CreateBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogServices from './services/blogs';
import loginServices from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('test');
  const [password, setPassword] = useState('test');
  const [user, setUser] = useState(null);

  // create blog states

  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');

  // notification states

  const [notification, setNotification] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    blogServices.getAll().then((data) => setBlogs(data));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogappLoggedUser');

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogServices.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginServices.login({ username, password });
      if (user) {
        setUser(user);
        window.localStorage.setItem('blogappLoggedUser', JSON.stringify(user));
      }
    } catch {
      displayNotification('error', 'Incorrect username or password');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('blogappLoggedUser');
    setUser(null);
  };

  const handleBlogPost = async (e) => {
    e.preventDefault();

    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    };

    try {
      const response = await blogServices.createBlog(blogObject);
      setBlogs(blogs.concat(response));
      setNewBlogTitle('');
      setNewBlogAuthor('');
      setNewBlogUrl('');
      displayNotification('success', 'Post created successfully');
    } catch {
      displayNotification('error', 'Error creating post');
    }
  };

  const loggedOut = () => {
    return (
      <Togglable btnLabel='Login'>
        <Notification notification={notification} message={message} />
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </Togglable>
    );
  };

  const loggedIn = () => {
    return (
      <React.Fragment>
        <Profile username={user.name} handleLogout={handleLogout} />
        <h2>Blogs</h2>
        <Togglable btnLabel='New blog'>
          <CreateBlog
            newBlogTitle={newBlogTitle}
            newBlogAuthor={newBlogAuthor}
            newBlogUrl={newBlogUrl}
            setNewBlogTitle={setNewBlogTitle}
            setNewBlogAuthor={setNewBlogAuthor}
            setNewBlogUrl={setNewBlogUrl}
            handleBlogPost={handleBlogPost}
          />
        </Togglable>
        <Notification notification={notification} message={message} />
        <Blogs blogs={blogs} />
      </React.Fragment>
    );
  };

  const displayNotification = (type, message) => {
    setNotification(type);
    setMessage(message);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  return (
    <React.Fragment>
      {user === null && loggedOut()}
      {user !== null && loggedIn()}
    </React.Fragment>
  );
};

export default App;
