# Simple-blogging-website-frontend

It is the client side of a simple blogging website

## How to run

1. Clone the repository
2. Go to the repository from command prompt or power shell (windows) or from terminal (linux).
3. Make your own ".env" file and include frontend port(as PORT) and backend port (as BACKEND_PORT) in that file.
4. Run command: `npm install`
5. Run command: `npm start`
6. You can use your own backend service or can clone from my repository https://github.com/asmachy/simple-blogging-website-backend

## Features
To register: `/register`

To login: `/login`

To see all blogs: `/` OR `/blogs`

To see any particular blog: `/blogs/{blog_id}`

To create new blog: `/blogs/new-blog`,  User have to be logged in

To update any blog: `/blogs/edit/{blog_id}` , Click on edit button, User have to be logged in and have to be author of that blog

To delete any blog: `/blogs/{blog_id}` , Click on the delete button, User have to be logged in and have to be author of that blog

## Technology Used
React js
