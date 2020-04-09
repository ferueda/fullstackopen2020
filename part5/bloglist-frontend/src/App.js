import React, { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import BlogForm from './components/CreateBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogServices from './services/blogs';
import loginServices from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

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

  const handleLogin = async ({ username, password }) => {
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

  const handleBlogPost = async (blogObject) => {
    try {
      const response = await blogServices.createBlog(blogObject);
      setBlogs(blogs.concat(response));

      displayNotification('success', 'Post created successfully');
    } catch {
      displayNotification('error', 'Error creating post');
    }
  };

  const updateBlog = async (blogObject, id) => {
    try {
      const response = await blogServices.updateBlog(blogObject, id);
      setBlogs(
        blogs.map((blog) => (blog.id !== response.id ? blog : response))
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const loggedOut = () => {
    return (
      <Togglable btnLabel='Login'>
        <Notification notification={notification} message={message} />
        <LoginForm login={handleLogin} />
      </Togglable>
    );
  };

  const loggedIn = () => {
    return (
      <React.Fragment>
        <Profile username={user.name} handleLogout={handleLogout} />
        <h2>Blogs</h2>
        <Togglable btnLabel='New blog'>
          <BlogForm createBlog={handleBlogPost} />
        </Togglable>
        <Notification notification={notification} message={message} />
        <Blogs blogs={blogs} updateBlog={updateBlog} />
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
