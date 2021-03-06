import React from 'react';
import dotenv from 'dotenv';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Registration from './components/Registration'
import{Header} from "./components/Header";
import Blogs from "./components/Blogs"
import Login from  "./components/Login"
import Newblog from './components/Newblog';
import EditBlog from './components/EditBlog';
import Blog from './components/Blog';
import axios from 'axios';
import LogoutDialogBox from './components/LogoutDialogBox';
dotenv.config();
class App extends React.Component {
  state={
    preLoginMessage: "",
    preRegistrationMessage: "",
    preBlogsMessage: "",
    token:"",
    author: false,
    preBlogMessage: "",
    currentBlog: {},
    isLoggedIn: false,
    backendPort: '5000',
  }



  componentWillMount(){
    const tokenCookie = document.cookie.split(';')[0];
    const tokenLength = tokenCookie.length;
    let token = ""
    if(process.env.BACKEND_PORT) this.setState({
      backendPort: process.env.BACKEND_PORT
    })
    if(tokenCookie && tokenCookie.substring(0,5) === "token"){
      token = tokenCookie.substring(6, tokenLength);
    }
    if(token && !(this.state.isLoggedIn)){
      axios.post(`http://localhost:${this.state.backendPort}/user/login/token`,{},{
        headers: {
            Authorization: `Bearer ${token}`
        }
       })
        .then(async(res)=>{
          await this.setState({
            token: token,
            author: res.data,
            isLoggedIn: true
          });
          
        })
        .catch(async(err)=>{
          document.cookie='token='+this.state.token+';path=/';
        })
      
    }
    
  }

  componentDidUpdate(nextProps, nextStates){
      document.cookie = 'token='+this.state.token+';path=/';      
  }

  setToken = async(token)=>{
    if(this.state.token!== token)
    await this.setState({
      token: token
    })
  }

  setIsLoggedIn = async(value)=>{
    await this.setState({
      isLoggedIn: value
    });
  }

  setAuthorEmail = async(email)=>{
    if(this.state.author!== email)
    await this.setState({
      author: email
    })
  }

  setCurrentBlog = async(currentBlog)=>{
    if(this.state.currentBlog!== currentBlog)
    await this.setState({
      currentBlog: currentBlog
    })
  }

  updateBlogsMessage = async(message)=>{
    if(this.state.preBlogsMessage!== message)
      await this.setState({
        preBlogsMessage: message
      })
  }

  updateBlogMessage = async(message)=>{
    if(this.state.preBlogMessage!== message)
    await this.setState({
        preBlogMessage: message
      });
  }

  updateRegistrationMessage = async(message)=>{
    if(this.state.preRegistrationMessage!== message)
      await this.setState({
        preRegistrationMessage: message
      });
  }

  updateLoginMessage = async(message)=>{
  
    if(this.state.preLoginMessage!== message)
    
      await this.setState({
        preLoginMessage: message
      });
    
  }

  render(){
    const {preLoginMessage, token, author, backendPort, preRegistrationMessage, preBlogMessage, currentBlog, preBlogsMessage} = this.state;
    const {setIsLoggedIn,updateRegistrationMessage, updateLoginMessage, setAuthorEmail,updateBlogsMessage, setCurrentBlog, updateBlogMessage, setToken} = this;
    
    return (
      <Router>
        <div className="App">
          <Header token = {token}/>
          <div className="content">
            <Switch>
              <Route exact path="/logout" component={
                props=>
                (<LogoutDialogBox isOpen={this.state.isLoggedIn}
                    updateBlogsMessage = {updateBlogsMessage}
                    setToken = {setToken}
                    setAuthorEmail = {setAuthorEmail}
                    setIsLoggedIn = {setIsLoggedIn}
                    history={props.history}/>)
              }/>
              <Route path="/logout/:wrongUrl" component=
              {props=> <div>{props.history.push("/logout")}</div>}/>

              <Route exact path="/" component=
              {props=> <div>{props.history.push("/blogs")}</div>}/>

              <Route exact path="/login" component=
                {props => 
                  <Login preLoginMessage={preLoginMessage}
                    updateLoginMessage={updateLoginMessage}
                    updateBlogsMessage = {updateBlogsMessage}
                    token= {token}
                    backendPort = {backendPort}
                    setIsLoggedIn = {setIsLoggedIn}
                    setToken = {setToken}
                    setAuthorEmail={setAuthorEmail}
                    history={props.history}/>}
              />
              <Route path="/login/:wrongUrl" component=
              {props=> <div>{props.history.push("/login")}</div>}/>
              
              <Route exact path="/register" component=
                {props => 
                  <Registration preRegistrationMessage={preRegistrationMessage} 
                  backendPort = {backendPort}
                  updateLoginMessage={updateLoginMessage}
                  updateRegistrationMessage={updateRegistrationMessage}
                  token={token}
                  history={props.history}/>
              }/>
              <Route path="/register/:wrongUrl" component=
              {props=> <div>{props.history.push("/register")}</div>}/>

              <Route exact path="/blogs" component=
              {props =>
                <Blogs preBlogsMessage={preBlogsMessage}
                  backendPort = {backendPort}
                  updateBlogMessage = {updateBlogMessage}
                  updateBlogsMessage = {updateBlogsMessage}/>
              }/>

              <Route exact path="/blogs/new-blog" component=
                {props =>
                 <Newblog updateBlogsMessage = {updateBlogsMessage}
                  backendPort = {backendPort}
                  updateLoginMessage = {updateLoginMessage}
                  token = {token}
                  setToken = {setToken}
                  history={props.history}
                  />
                }/>
              <Route path="/blogs/new-blog/:wrongUrl" component=
              {props=> <div>{props.history.push("/blogs/new-blog")}</div>}/>

              <Route exact path="/blogs/edit/:id" component=
                {props=>
                  <EditBlog blog={currentBlog}
                    match = {props.match}
                    backendPort = {backendPort}
                    updateBlogsMessage = {updateBlogsMessage}
                    updateBlogMessage = {updateBlogMessage}
                    updateLoginMessage = {updateLoginMessage}
                    token = {token}
                    setToken = {setToken}
                    history={props.history}/>
                  }
                />
              <Route path="/blogs/edit/:id/:wrongUrl" component=
              {props=> <div>{props.history.push("/blogs/")}</div>}/>

              <Route exact path="/blogs/:id" component={
                props=>
                  <Blog setCurrentBlog={setCurrentBlog}
                    history = {props.history}
                    match = {props.match}
                    backendPort = {backendPort}
                    updateBlogsMessage={updateBlogsMessage}
                    updateBlogMessage = {updateBlogMessage}
                    token = {token}
                    author={author}
                    preBlogMessage = {preBlogMessage}
                  />
              }/>
              <Route path="/blogs/:id/:wrongUrl" component=
              {props=> <div>{props.history.push("/blogs")}</div>}/>

              <Route path="/:wrongUrl" component=
              {props=> <div>{props.history.push("/")}</div>}/>

            </Switch>
          </div>
          <div className="footer">
            <h4>?? Developed by Team Efialtis</h4>
          </div>
        </div>
        
      </Router>
      
    );
  }
} 

export default App;