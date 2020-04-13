import React, { Component } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import { Blog } from './Blogs';

test("renders blog's title and author but not url and likes", () => {
  const blog = {
    title: 'A test blog',
    Author: 'Felipe Rueda',
    url: 'www.google.cl',
    likes: 100,
  };

  const component = render(<Blog blog={blog} />);
  const div = component.container.querySelector('div');
  const titleSpan = div.querySelector('span');

  const hiddenDiv = component.container.querySelector('div:nth-child(2');

  expect(component).toBeDefined();
  expect(div).toBeDefined();
  expect(titleSpan).toBeDefined();
  expect(hiddenDiv).toBeDefined();

  expect(div).not.toHaveStyle('display: none');
  expect(titleSpan).toHaveTextContent('A test blog');
  expect(hiddenDiv).toHaveStyle('display: none');
});
