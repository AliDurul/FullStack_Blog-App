<div id="user-content-toc">
  <ul align="left">
    <summary><h1 style="display: inline-block">Full Stack Blog App</h1></summary>
  </ul>
</div>

<table>
   <thead>
        <tr>
            <th>What's used in this app ?</th>
            <th>How to run ?</th>
            <th>Author</th>
        </tr>
    </thead>
  <tbody>
  <tr>
    <td> 
      <li> React  
      <li> Material UI
      <li> Redux / Toolkit
      <li> Database Authorization 
      <li> React-router-dom  
      <li> Database connected  
      <li> Custom hooks  
      <li> Axios instance
    </td>
    <td>  <h4>Once you clone the project</h4>  
      
 1) run  `pnpm install`  or `yarn install` for node modules
 2) run `pnpm run dev` or `yarn run dev` for open development stage
    
   </td>
    <td> <li> <a href="https://github.com/AliDurul" target="_blank">Take a look at my other projects</a> <li> <a href="https://www.linkedin.com/in/ali-durul/" target="_blank">Visit me on Linkedin</a> 
  </tr>
  <tr>
    <td colspan="3"><h3>What is this project about ?</h3> 
<p>
In this project, Any user can view posts but can't comment, like, or view details without registering or logging in. Registered users can like existing posts, create new blogs, edit/delete their blogs, and comment on others'. It's a platform for sharing and engaging with content.
</p>
    </td>
  </tr>
      </tbody>
</table>




<div id="user-content-toc">
  <ul align="left">
    <summary><h2>How does my project look</h2></summary>
  </ul>
</div>


[Live Link](https://full-stack-blog-app-tau.vercel.app)



<div id="user-content-toc">
  <ul align="left">
    <summary><h2>Feedback and Collaboration</h2></summary>
  </ul>
</div>
I value your feedback and suggestions. If you have any comments, questions, or ideas for improvement regarding this project or any of my other projects, please don't hesitate to reach out. I'm always open to collaboration and welcome the opportunity to work on exciting projects together.
Thank you for visiting my project. I hope you have a wonderful experience exploring it, and I look forward to connecting with you soon!


## Project Skeleton

```
Blog App (Folder)
|
|-- public
|   |-- Lee.jpg
|   |-- vite.svg
|
|-- src
|   |-- app
|   |   |-- store.js
|   |
|   |-- components
|   |   |-- BlogCard.jsx
|   |   |-- BlogUpdate.jsx
|   |   |-- CommentBox.jsx
|   |   |-- Navbar.jsx
|   |
|   |-- features
|   |   |-- authSlice.js
|   |   |-- blogSlice.js
|   |
|   |-- helper
|   |   |-- ToastNotify.js
|   |
|   |-- hooks
|   |   |-- useAuth.js
|   |   |-- useAxios.js
|   |   |-- useBlog.js
|   |
|   |-- pages
|   |   |-- About.jsx
|   |   |-- Dashboard.jsx
|   |   |-- DetailBlog.jsx
|   |   |-- Login.jsx
|   |   |-- MyBlogs.jsx
|   |   |-- NewBlog.jsx
|   |   |-- Profile.jsx
|   |   |-- Register.jsx
|   |
|   |-- router
|   |   |-- AppRouter.jsx
|   |   |-- PrivateRouter.jsx
|   |
|   |-- styles
|   |   |-- globalStyles.js
|   |
|   |-- App.jsx
|   |-- index.css
|   |-- main.jsx
|
|-- .eslintrc.cjs
|-- .gitignore
|-- README.md
|-- index.html
|-- package.json
|-- pnpm-lock.yaml
|-- vite.config.js
```
