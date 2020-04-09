import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');

  const handleBlogPost = (e) => {
    e.preventDefault();

    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    };

    createBlog(blogObject);

    setNewBlogTitle('');
    setNewBlogAuthor('');
    setNewBlogUrl('');
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleBlogPost}>
        <div>
          <input
            type='text'
            name='Title'
            placeholder='Enter title'
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          <input
            type='text'
            name='Author'
            placeholder='Enter author'
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          <input
            type='text'
            name='URL'
            placeholder='Enter url'
            value={newBlogUrl}
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <button type='subtmit'>Post</button>
      </form>
    </div>
  );
};

export default BlogForm;
