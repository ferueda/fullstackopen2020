import React from 'react';

const CreateBlog = ({
  newBlogTitle,
  newBlogAuthor,
  newBlogUrl,
  setNewBlogTitle,
  setNewBlogAuthor,
  setNewBlogUrl,
  handleBlogPost,
}) => {
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

export default CreateBlog;
