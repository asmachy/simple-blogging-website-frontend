import axios from "axios";
import React from "react";
import {Switch,  Route, Link } from 'react-router-dom';
class Blogs extends React.Component {
    state={
        blogs:[],
        currentBlog: {},
        preBlogMessage: "",
        isLoaded: false
    };
    params = {
        id:''
    };

    setCurrentBlog= async(blog)=>{
        await this.setState({
            currentBlog: blog
        });
    }
    updateBlogMessage = async(message)=>{
        await this.setState({
            preBlogMessage: message
        })
    }    

    componentDidMount () {
        
        axios.get(`http://localhost:5000/posts`, {
            headers: {
              Accept: '*'
            }
           })
        .then((res)=>{
            this.setState({
                blogs: res.data,
                isLoaded: true
            });
    
        })
        .catch((err)=>{
            this.setState({
                isLoaded: true
            });
        })
    }


    render(){
        const {blogs, isLoaded} = this.state;
        const {preBlogsMessage} = this.props;
        
        return(
            <div>
            <div className="content">
              <div className="blog-list">
                {preBlogsMessage && <h2>{preBlogsMessage}</h2>}
                <h2>All Blogs</h2>
                {!isLoaded && <h2>Loading...</h2>}
                {blogs && blogs.map(blog=>(
                  <div className="blog-preview" key={blog._id} >
                    <Link to={`/blogs/${blog._id}`}>
                        <h2>{ blog.title }</h2>
                        <p>Written by { blog.author }</p>
                    </Link>
                </div>
                ))}
                {isLoaded && !blogs && <div className="blog-preview"><h2>The blog list is empty!</h2></div>}
             </div>
                
            </div>
            
            </div>
        )
    }
}

export default Blogs;