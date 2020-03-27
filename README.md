# fullstackopen2020
Personal submissions for the 2020 version of University of Helsinki's fullstackopen course.

Official Website: https://fullstackopen.com/en

## Curriculum

- React
- Redux
- Node.js and Express
- MongoDB
- GraphQL
- TypeScript

This course will introduce modern JavaScript-based web development. The main focus is on building single page applications with ReactJS that use REST APIs built with Node.js.

## Course content

0. Fundamentals of Web apps

In this part, we will familiarize ourselves with the practicalities of taking the course. After that we will have an overview of the basics of web development, and also talk about the advances in web application development during the last few decades.

  * General info
  * Fundamentals of Web apps
  
1. Introduction to React

In this part, we will familiarize ourselves with the React-library, which we will be using to write the code that runs in the browser. We will also look at some features of Javascript that are important for understanding React.

  * Introduction to React
  * Javascript
  * Component state, event handlers
  * A more complex state, debugging React apps
  
2. Communicating with server

Let's continue our introduction to React. First, we will take a look at how to render a data collection, like a list of names, to the screen. After this, we will inspect how a user can submit data to a React application using HTML forms. Next, our focus shifts towards looking at how JavaScript code in the browser can fetch and handle data stored in a remote backend server. Lastly, we will take a quick look at a few simple ways of adding CSS styles to our React applications.

  * Rendering a collection, modules
  * Forms
  * Getting data from server
  * Altering data in server
  * Adding styles to React app
  
3. Programming a server with NodeJS and Express

In this part our focus shifts towards the backend, that is, towards implementing functionality on the server side of the stack. We will implement a simple REST API in Node.js by using the Express library, and the application's data will be stored in a MongoDB database. At the end of this part, we will deploy our application to the internet.

  * Nose.js and Express
  * Deploying app to internet
  * Saving data to MongoDB
  * Validation and ESLint
  
4. Testing Express servers, user administration

In this part, we will continue our work on the backend. Our first major theme will be writing unit and integration tests for the backend. After we have covered testing, we will take a look at implementing user authentication and authorization.

  * Structure of backend application, introduction to testing
  * Testing the backend
  * User administration
  * Token authentication
  
5. Testing React apps

In this part we return to the frontend, first looking at different possibilities for testing the React code. We will also implement token based authentication which will enable users to log in to our application.

  * Login in frontend
  * props.children and proptypes
  * Testing React apps
  * End to end testing
  
6. State management with Redux

So far, we have placed the application's state and state logic directly inside React-components. When applications grow larger, state management should be moved outside React-components. In this part, we will introduce the Redux-library, which is currently the most popular solution for managing the state of React-applications.

  * Flux-architecture and Redux
  * Many reducers
  * Communicating with server in a redux application
  * connect
  
7. React router, custom hooks, styling app with CSS and webpack

The seventh part of the course touches on several different themes. First, we'll get familiar with React router. React router helps us divide the application into different views that are shown based on the URL in the browser's address bar. After this, we'll look at a few more ways to add CSS-styles to React applications. During the entire course we've used create-react-app to generate the body of our applications. This time we'll take a look under the hood: we'll learn how Webpack works and how we can use it to configure the application ourselves. We shall also have a look on hook-functions and how to define a custom hook.

  * React-router
  * Custom hooks
  * More about styles
  * Webpack
  * Class components, miscellaneous
  * Exercises: extending the bloglist
  
8. GraphQL

This part of the course is about GraphQL, Facebook's alternative to REST for communication between browser and a server.

  * GraphQL-server
  * React and GraphQL
  * Database and user administration
  * Login and updating the cache
  * Fragments and subscriptions
  
9. Typescript

This part is all about TypeScript: and open-source typed superset of JavaScript developed by Microsoft that compiles to plain JavaScript.

In this part we will be using the tools previously introduced to build end-to-end features to an existing ecosystem with linters predefined and an existing codebase writing TypeScript. After doing this part you should be able to understand, develop and configure projects using TypeScript.

  * Background and introduction
  * First steps with Typescript
  * Typing the express app
  * React with types
