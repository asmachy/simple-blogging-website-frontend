import axios from "axios";
import React from "react";
import { Link } from 'react-router-dom';
class Blogs extends React.Component {
    state={
        blogs:[],
        currentBlog: {},
        isLoaded: false,
        messageInsteadofBlogs: "The blog list is empty!"
    };
    params = {
        id:''
    };

    setCurrentBlog= async(blog)=>{
        await this.setState({
            currentBlog: blog
        });
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
        .catch(async(err)=>{
            await this.setState({
                isLoaded: true,
                messageInsteadofBlogs: "Server failed.. Please Try after sometimes.."
            });
        })
        if(this.props.preBlogsMessage){
            setTimeout(()=>{
                this.props.updateBlogsMessage("");
            },2000);
        }
    }


    render(){
        const {blogs, isLoaded} = this.state;
        const {preBlogsMessage} = this.props;
        
        return(
            <div>
              <div className="blog-list">
                <h2>{preBlogsMessage}</h2>
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
                {isLoaded && !blogs.length && <div className="blog-preview"><h2>{this.state.messageInsteadofBlogs}</h2></div>}
             </div> 
            </div>
        )
    }
}

export default Blogs;