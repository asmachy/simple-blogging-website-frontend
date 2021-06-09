import React, {Component} from 'react';
import axios from "axios";
// import {createBrowserHistory as History} from 'history';
import 'semantic-ui-css/semantic.min.css';

class Registration extends Component {
    state = {
            fullname: "",
            email: "",
            password: "",
            confirmPassword: ""
        };
    userInfo={};
    passwordTarget={};
    confirmPasswordTarget={};
    inputHandler = async(e)=>{
        await this.setState({
            [e.target.id]: e.target.value
        });
        const {password, confirmPassword} = this.state;
        if(e.target.id==="password") {
            this.passwordTarget = e.target;
        }
        else if(e.target.id === "confirmPassword") this.confirmPasswordTarget = e.target;
        
        if(e.target.id==="confirmPassword"||e.target.id==="password"){
            if(password.length<6) e.target.setCustomValidity("Password must contain at least 6 characters");
            else if(password !== confirmPassword){
                e.target.setCustomValidity("Passwords Didn't Match");
            }
            else if(password.length>=6 && password===confirmPassword){
                this.passwordTarget.setCustomValidity("");
                this.confirmPasswordTarget.setCustomValidity("");
            }
        }
    }

    registerErrorRouteHandling = async(err) =>{
        const {updateLoginMessage, updateRegistrationMessage, history} = this.props;
        if(err.response.status===500){
            await updateRegistrationMessage(err.response.data);
            history.push("/register");    
        }
        else{
            await updateLoginMessage(err.response.data);
            history.push("/login");    
        }
    }

    handleSubmit = async(e) =>{
        e.preventDefault();
        const {registerErrorRouteHandling} = this;
        const {fullname, email, password} = this.state;
        const {updateLoginMessage, history} = this.props
        axios.post(`http://localhost:5000/user/register/`, {
            fullname: fullname,
            email: email,
            password: password
        })
        .then(async(res)=>{
            await updateLoginMessage(res.data);
            history.push("/login");    
        })
        .catch(async(err)=>{
            registerErrorRouteHandling(err);
        })
        
    }
    render () {
        const {preRegistrationMessage, token, history} = this.props;
        
        return (
            <div>
                {token && history.push("/blogs")}
                <form className="form" onSubmit={this.handleSubmit}>
                    {preRegistrationMessage && <h3>{preRegistrationMessage}</h3>}
                    <h1>Author Registration</h1>
                    <label>Name*:</label> 
                    <input id="fullname" type="text" value={this.state.fullname} 
                        onChange={this.inputHandler} placeholder="Enter fullname" required/>
                    <label>Email*:</label> 
                    <input id="email" type="email" value={this.state.email} 
                        onChange={this.inputHandler} placeholder="Enter email address" required/>
                    <label>Password*:</label> 
                    <input id="password" type="password" value={this.state.password} 
                        onChange={this.inputHandler} placeholder="Enter password" required/>
                    <label>Confirm your Password*:</label> 
                    <input id="confirmPassword" type="password" value={this.state.confirmPassword} 
                        onChange={this.inputHandler} placeholder="Re-enter your password" required/>
                    <input type="submit" value="Register"/>
                </form>
            </div>
        );
    }
}

export default Registration;