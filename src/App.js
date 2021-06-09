import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Registration from './components/Registration'
import{Header} from "./components/Header";
import Blogs from "./components/Blogs"
import Login from  "./components/Login"
import Newblog from './components/Newblog';
import EditBlog from './components/EditBlog';
import Blog from './components/Blog';

class App extends React.Component {
  state={
    preLoginMessage: "",
    preRegistrationMessage: "",
    preBlogsMessage: "",
    token:"",
    author: false,
    preBlogMessage: "",
    currentBlog: {}
  }

  // componentDidUpdate(){
    // window.localStorage.setItem('token', JSON.stringify(this.state.token));
    // this.setState({
    //   token: window.localStorage.getItem('token')
    // })
    
  // }

  // componentDidMount(){
  //   this.userData = JSON.parse(localStorage.getItem('user'));
  //   if(localStorage.getItem('user')){
  //     this.setState({
  //       token: this.userData.token,
  //       author: this.userData.author,
  //     })
  //   }
  // }


  componentDidMount(){

    console.log("app did mount1");
    const tokenCookie = document.cookie;
    const tokenLength = tokenCookie.length;
    console.log("tokenCookie", tokenCookie);
    console.log("tokenLenght", tokenLength);
    if(tokenCookie && tokenCookie.substring(0,5) === "token"){
      const token = tokenCookie.substring(6, tokenLength);
      console.log("token", token);
      this.setState({
        token: token
      });
    }
    const author = localStorage.getItem("author");
    if(author){
      this.setState({
        author: author.substring(1,author.length-1)
      });
    }
    console.log("app did mount2");
  }

  componentDidUpdate(nextProps, nextStates){
    console.log("app did update1");
    const tokenCookie = document.cookie;
    const tokenLength = tokenCookie.length;
    

    // if(!this.state.token || (!tokenCookie || (tokenLength>6 && tokenCookie.substring(0,5) !== "token"))){
      // document.cookie='';
      // document.cookie.remove();
      document.cookie = 'token='+this.state.token;  
    // }
    
    window.localStorage.setItem('author', JSON.stringify(this.state.author));
    console.log("app did update2");
    
  }

  setToken = async(token)=>{
    await this.setState({
      token: token
    })
  }

  setAuthorEmail = async(email)=>{
    await this.setState({
      author: email
    })
  }

  setCurrentBlog = async(currentBlog)=>{
    await this.setState({
      currentBlog: currentBlog
    })
  }

  updateBlogsMessage = async(message)=>{
    if(message) {
      await this.setState({
        preBlogsMessage: message
      })
    }
  }

  updateBlogMessage = async(message)=>{
    if(message) {
      await this.setState({
        preBlogMessage: message
      })
    }
  }



  updateRegistrationMessage = async(message)=>{
    if(message) {
      await this.setState({
        preRegistrationMessage: message
      })
    }
  }

  updateLoginMessage = async(message)=>{
    if(message) {
      await this.setState({
        preLoginMessage: message
      })
    }
  }

  logout = ( props)=>{
    console.log("logout",props);
    this.setState({
      preBlogsMessage:"",
      token:"",
      author:""
    })
    props.history.push("/blogs");
  }
  
  render(){
    const {preLoginMessage, token, author, preRegistrationMessage, preBlogMessage, currentBlog, preBlogsMessage} = this.state;
    const {updateRegistrationMessage, updateLoginMessage, setAuthorEmail,updateBlogsMessage, setCurrentBlog, updateBlogMessage, setToken} = this;
    
    return (
      <Router>
        <div className="App">
          <Header token = {token}/>
          <div className="content">
            <Switch>
              <Route exact path="/logout" component={
                props => <div>{this.logout(props)}</div>
                }/>
              <Route exact path="/" component=
              {props=> <div>{props.history.push("/blogs")}</div>}/>


              <Route exact path="/login" component=
                {props => 
                  <Login preLoginMessage={preLoginMessage}
                    updateLoginMessage={updateLoginMessage}
                    updateRegistrationMessage={updateRegistrationMessage}
                    updateBlogsMessage = {updateBlogsMessage}
                    token= {token}
                    setToken = {setToken}
                    setAuthorEmail={setAuthorEmail}
                    history={props.history}/>}
              />
              <Route exact path="/register" component=
                {props => 
                  <Registration preRegistrationMessage={preRegistrationMessage} 
                  updateLoginMessage={updateLoginMessage}
                  updateRegistrationMessage={updateRegistrationMessage}
                  updateBlogsMessage = {updateBlogsMessage}
                  token={token}
                  history={props.history}/>
              }/>
              <Route exact path="/blogs" component=
              {props =>
                <Blogs preBlogsMessage={preBlogsMessage}
                  token = {token}
                  history={props.history}
                  setToken = {setToken}
                  author={author}
                  updateBlogsMessage = {updateBlogsMessage}
                  updateLoginMessage={updateLoginMessage}/>
              }/>

              <Route path="/blogs/new-blog" component=
                {props =>
                 <Newblog preBlogsMessage={preBlogsMessage}
                  updateBlogsMessage = {updateBlogsMessage}
                  updateLoginMessage = {updateLoginMessage}
                  token = {token}
                  setToken = {setToken}
                  history={props.history}
                  />
                }/>
    
              <Route exact path="/blogs/edit/:id" component=
                {props=>
                  <EditBlog preBlogMessage={preBlogMessage}
                    blog={currentBlog}
                    match = {props.match}
                    updateBlogsMessage = {updateBlogsMessage}
                    updateBlogMessage = {updateBlogMessage}
                    updateLoginMessage = {updateLoginMessage}
                    token = {token}
                    setToken = {setToken}
                    // author={author}
                    history={props.history}/>
                  }
                />

              <Route exact path="/blogs/:id" component={
                props=>
                  <Blog token = {token}
                    setToken = {setToken}
                    preBlogMessage = {preBlogMessage}
                    match = {props.match}
                    author={author}
                    history = {props.history}
                    setCurrentBlog={setCurrentBlog}
                    updateBlogsMessage={updateBlogsMessage}
                    updateBlogMessage = {updateBlogMessage}
                    updateLoginMessage = {updateLoginMessage}   
                  />
              }/>

            </Switch>
          </div>
        </div>
      </Router>
    );
  }
} 

export default App;