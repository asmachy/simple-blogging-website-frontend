import React from "react";
import axios from "axios";

class Newblog extends React.Component {

    state={
        title:"",
        body:"",
        isCreated: false
    }

    inputHandler = async(e)=>{
        await this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = async(e)=>{
        const {token, setToken, updateBlogsMessage, updateLoginMessage, history} = this.props
        e.preventDefault();
        await axios.post(`http://localhost:5000/posts/`, {
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
            updateBlogsMessage("Blog is added!");
            history.push("/blogs");
        })
        .catch(async(err)=>{
            await setToken("");
            updateLoginMessage(err.response.data);
            updateBlogsMessage("");
            history.push('/login')
            
        })
    }


    render() {
    
        const {token, updateLoginMessage,history} = this.props;
        
        return (
            <div>
                {!token && updateLoginMessage("Are you an author?") && history.push("/login")}
                <form className="form" onSubmit={this.handleSubmit}>
                    <h1>Add New Blog</h1>
                    <label>Add Title*:</label> 
                    <textarea id="title" type="text" value={this.state.title} 
                        onChange={this.inputHandler} placeholder="Enter title" required/>
                    <label>Add Body*: </label> 
                    <textarea id="body" rows="7" type="text" value={this.state.body} 
                        onChange={this.inputHandler} placeholder="Enter body" required/>
                    <input type="submit" value="Add Blog"/>
                </form>
            </div>
        )
    }
}

export default Newblog