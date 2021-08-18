import axios from "axios";
import React from "react"
import DeleteDialogBox from "./DeleteDialogBox";
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
            // console.log(err.status);
            if(!err.response){
                err ={
                    response: {data: "Server failed.. Please try after some time..", status: 500}
                }
               }
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
        axios.get(`http://localhost:5000/posts/${id}`, {
            headers: {
              Accept: '*'
            }
           })
        .then((res)=>{
            this.setState({
                blog: res.data[0],
                isLoaded: true
            });
            if(this.props.author===this.state.blog.author_email){
                this.setState({
                    isAuthor: true
                })
            }
            
        })
        .catch((err)=>{
            console.log("err ki", err);
            this.setState({
                isLoaded: true
            });
            console.log(err);
            if(!err.response){
                 err ={
                    response: {data: "Server failed.. Please try after some time..", status: 500}
                }
               }            this.setState({
                errMessage: err.response.data
            })
        })
        if(this.props.preBlogMessage){
            setTimeout(()=>{
                this.props.updateBlogMessage("");
            },4000);
        }
    }

    render(){
        const {blog, isAuthor, errMessage, isLoaded} = this.state;
        const {preBlogMessage} = this.props
        const {deleteHandlerYes, deleteHandlerNo} = this;
        
        return (
            <div>
             <div className ="blog-details">
                {preBlogMessage && (<h3 text-align="center">{preBlogMessage}</h3>)}
                {/* {preBlogMessage && (()=> updateBlogMessage(""))} */}
                {errMessage && <h3>{errMessage}</h3>}
                {!errMessage &&isLoaded && blog && (<article>
                    <h2>{ blog.title }</h2>
                    <h4>{ "Written by:  "+blog.author }</h4>
                    {blog.updatedAt && (<h5>{`Last updated at: ${blog.updatedAt.substring(11,19)}, ${blog.updatedAt.substring(0,10)} `}</h5>)}
                    <p>{ blog.body }</p> 
                    <br/>
                    <br/>
                    <div display="flex" align-items="center" margin-left="0 auto">
                        {isAuthor && <button className="button" onClick ={this.deleteHandler} >Delete</button>}
                        {isAuthor && <button className="button" onClick={this.editHandler} >Edit</button>}
                    </div>
                    <DeleteDialogBox isOpen={this.state.isDeleteDialogOpen} deleteHandlerYes={deleteHandlerYes} deleteHandlerNo={deleteHandlerNo}
                    />
                </article>)
                }
                {!blog && isLoaded && (
                    <article>
                        <h2>{errMessage}</h2>
                    </article>
                )}
                {!isLoaded && (<article>
                        <h2>Loading...</h2>
                    </article>)}
            </div>
            </div>
            
        )
    }
}
export default Blog;