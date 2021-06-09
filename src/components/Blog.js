import axios from "axios";
import React from "react"
import DialogBox from "./DialogBox";
class Blog extends React.Component {
    
    state={
        blog:{},
        isLoaded: false,
        preBlogMessage: "",
        isAuthor: false,
        errMessage: "",
        isDeleteDialogOpen: false
    }

    editHandler = async(e)=>{
        this.props.setCurrentBlog(this.state.blog);
        this.props.history.push(`/blogs/edit/${this.props.match.params.id}`);
    }

    deleteHandlerYes = async()=>{
        this.setState({
            isDeleteDialogOpen: false
        })
        const id = this.props.match.params.id;
        const {updateBlogsMessage,updateBlogMessage, token,history} = this.props;
        axios.delete(`http://localhost:5000/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
           })
        .then((res)=>{
            updateBlogsMessage(res.data);
            history.push("/blogs");
        })
        .catch((err)=>{
            if(this.state.blog){
                updateBlogMessage(err.response.data);
            }
            else{
                this.setState({
                    errMessage: err.response.data
                })
            }
        })
    }
    deleteHandlerNo = async()=>{
        this.setState({
            isDeleteDialogOpen: false
        })
    }

    deleteHandler = ()=>{
        this.setState({
            isDeleteDialogOpen: true
        })
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        const {updateBlogsMessage} = this.props;
        
        axios.get(`http://localhost:5000/posts/${id}`, {
            headers: {
              Accept: '*'
            }
           })
        .then((res)=>{
            updateBlogsMessage("");
            this.setState({
                blog: res.data[0]
            });
            if(this.props.author===this.state.blog.author_email){
                this.setState({
                    isAuthor: true
                })
            }
            
        })
        .catch((err)=>{
            this.setState({
                errMessage: err.response.data
            })
        })
    }

    render(){
        const {blog, isAuthor, errMessage} = this.state;
        const {preBlogMessage} = this.props
        const {deleteHandlerYes, deleteHandlerNo} = this

        return (

            <div className ="blog-details">
                {preBlogMessage && <h3>{preBlogMessage}</h3>}
                {errMessage && <h3>{errMessage}</h3>}
                {!errMessage && blog && (<article>
                    <h2>{ blog.title }</h2>
                    <h4>Written by: { blog.author }</h4>
                    <p>{ blog.body }</p> 
                    <br/>
                    <br/>
                    {isAuthor && <button className="button-left" onClick={this.editHandler} >Edit</button>}
                    <br/><br/>
                    {isAuthor && <button className="button-right" onClick ={this.deleteHandler} >Delete</button>}
                    <DialogBox isOpen={this.state.isDeleteDialogOpen} deleteHandlerYes={deleteHandlerYes} deleteHandlerNo={deleteHandlerNo}
                    />
                </article>)
                }
                {!blog && (
                    <article>
                        <h2>errMessage</h2>
                    </article>
                )}
            </div>
            
        )
    }
}
export default Blog;