import axios from "axios";
import React from "react";
class EditBlog extends React.Component {

    state={
        title:"",
        body:"",
        isSaved: false
    }

    inputHandler = async(e)=>{
        await this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = async(e)=>{
        
        e.preventDefault();
        let id = this.props.match.params.id;
        const {token, setToken, updateBlogMessage, updateBlogsMessage, updateLoginMessage, history} = this.props
        await axios.put(`http://localhost:5000/posts/${id}`, {
            title: this.state.title,
            body: this.state.body
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(async(res)=>{
            await this.setState({
                isCreated: true
            });
            updateBlogMessage(res.data.message);
            updateBlogsMessage("");
            
            history.push(`/blogs/${id}`);
            
        })
        .catch(async(err)=>{
            if(err.response.status===403 || err.response.data==="Post not Found")
            {
                updateBlogsMessage(err.response.data);
                history.push('/');
            }
            else{
                await setToken("");
                updateLoginMessage(err.response.data);
                history.push('/login')
            }
            
        })
    }


    componentDidMount(){
        
        const {blog} = this.props;
        if(blog)
        {
           this.setState({
            title: blog.title,
            body: blog.body
            })
        }
    }

    render() {
        
        const {token, updateLoginMessage,history} = this.props;
        
        return (
            <div>
                {!token && updateLoginMessage("Are you an author?") && history.push("/login")}
                
                <form className="form" onSubmit={this.handleSubmit}>
                    <h2>Edit Blog</h2>
                    <label>Title:</label> 
                    <textarea id="title" type="text" value={this.state.title} 
                        onChange={this.inputHandler} placeholder="Enter title" required/>
                    <label>Body: </label> 
                    <textarea rows="7" id="body" type="text" value={this.state.body} 
                        onChange={this.inputHandler} placeholder="Enter body" required/>
                    <input type="submit" value="Save"/>
                </form>
            </div>
        )
    }

}

export default EditBlog;