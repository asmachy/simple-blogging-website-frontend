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
![register](https://user-images.githubusercontent.com/21212501/122045465-967c1180-cdff-11eb-97a8-ae92d3720dce.PNG)


To login: `/login`
![login](https://user-images.githubusercontent.com/21212501/122078581-83c50500-ce1e-11eb-8e64-7f7c84c10a83.PNG)

To see all blogs: `/` OR `/blogs`
![blogs](https://user-images.githubusercontent.com/21212501/122078613-89224f80-ce1e-11eb-8664-70d4d16e5b96.PNG)

To see any particular blog: `/blogs/{blog_id}`
![blog](https://user-images.githubusercontent.com/21212501/122078657-92132100-ce1e-11eb-85f4-156b43fa5a11.PNG)

To create new blog: `/blogs/new-blog`,  User have to be logged in
![newblog](https://user-images.githubusercontent.com/21212501/122078696-993a2f00-ce1e-11eb-94ca-ba82e30ae6a7.PNG)

To update any blog: `/blogs/edit/{blog_id}` , Click on edit button, User have to be logged in and have to be author of that blog
![edit blog](https://user-images.githubusercontent.com/21212501/122078756-a3f4c400-ce1e-11eb-8a67-fbaab2259b2d.PNG)

To delete any blog: `/blogs/{blog_id}` , Click on the delete button, User have to be logged in and have to be author of that blog
![delete](https://user-images.githubusercontent.com/21212501/122078782-a6efb480-ce1e-11eb-96b7-765afa554697.PNG)

To logout: `/logout`
![logout](https://user-images.githubusercontent.com/21212501/122078893-bc64de80-ce1e-11eb-998a-2bd6793bbcc0.PNG)

## Technology Used
React js
