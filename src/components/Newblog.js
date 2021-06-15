import React from "react";
import axios from "axios";

class Newblog extends React.Component {

    state={
        title:"",
        body:"",
        isCreated: false,
        preNewBlogMessage: ""
    }

    inputHandler = async(e)=>{
        await this.setState({
            [e.target.id]: e.target.value
        })
    }

    errorRouteHandling = async(errRes)=>{
        const { setToken, updateBlogsMessage, updateLoginMessage, history} = this.props
        if(errRes.status===401 || errRes.status === 410){
            await setToken("");
            updateLoginMessage(errRes.data);
            updateBlogsMessage("");
            history.push('/login')
        }
        else {
            await this.setState({
                preNewBlogMessage: errRes.data
            })
            // history.push('/login')
        }
        
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        const {token, updateBlogsMessage,backendPort, history} = this.props;
        const {title, body} = this.state;
        axios.post(`http://localhost:${backendPort}/posts/`, {
            title: title.trim(),
            body: body.trim()
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
            this.errorRouteHandling(err.response)            
        })
    }


    render() {
        const {preNewBlogMessage} = this.state; 
        const {token, updateLoginMessage,history} = this.props;
        
        return (
            <div>
                {!token && updateLoginMessage("Are you an author?") && history.push("/login")}
                <form className="form" onSubmit={this.handleSubmit}>
                    {preNewBlogMessage && <h3>{preNewBlogMessage}</h3>}
                    <h1>Add New Blog</h1>
                    <label>Add Title*:</label> 
                    <textarea id="title" type="text" value={this.state.title} 
                        onChange={this.inputHandler} placeholder="Enter title" required/>
                    <label>Add Body*: </label> 
                    <textarea id="body" rows="10" cols="100" type="text" value={this.state.body} 
                        onChange={this.inputHandler} placeholder="Enter body" required/>
                    <input className="submit-button" type="submit" value="Add Blog"/>
                </form>
            </div>
        )
    }
}

export default Newblog