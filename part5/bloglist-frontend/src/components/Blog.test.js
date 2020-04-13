import React, { Component } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import { Blog } from './Blogs';

describe('<Blog />', () => {
  let component;

  const blog = {
    title: 'A test blog',
    Author: 'Felipe Rueda',
    url: 'www.google.cl',
    likes: 100,
  };

  beforeEach(() => {
    component = render(<Blog blog={blog} />);
  });

  test("renders blog's title and author but not url and likes", () => {
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

  test("check blog's url and likes are shown when the button is pressed", () => {
    const button = component.getByText('View');
    fireEvent.click(button);

    const div = component.container.querySelector('div:nth-child(2)');

    const titleDiv = div.querySelector('div:nth-child(1)');
    const urlDiv = div.querySelector('div:nth-child(2)');

    expect(button).toBeDefined();
    expect(div).toBeDefined();
    expect(titleDiv).toBeDefined();
    expect(titleDiv).toHaveTextContent('Title: A test blog');
    expect(urlDiv).toBeDefined();
    expect(urlDiv).toHaveTextContent('URL: www.google.cl');
  });
});
