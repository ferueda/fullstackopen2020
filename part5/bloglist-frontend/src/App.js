import React, { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import CreateBlog from './components/CreateBlog';
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
      setUser(user);
      window.localStorage.setItem('blogappLoggedUser', JSON.stringify(user));
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error.message);
    }
  };

  const loggedOut = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    );
  };

  const loggedIn = () => {
    return (
      <React.Fragment>
        <Profile username={user.name} handleLogout={handleLogout} />
        <CreateBlog
          newBlogTitle={newBlogTitle}
          newBlogAuthor={newBlogAuthor}
          newBlogUrl={newBlogUrl}
          setNewBlogTitle={setNewBlogTitle}
          setNewBlogAuthor={setNewBlogAuthor}
          setNewBlogUrl={setNewBlogUrl}
          handleBlogPost={handleBlogPost}
        />
        <Blogs blogs={blogs} />
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {user === null && loggedOut()}
      {user !== null && loggedIn()}
    </React.Fragment>
  );
};

export default App;
