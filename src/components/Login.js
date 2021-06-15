import React, {Component} from 'react';
import axios from "axios";
import 'semantic-ui-css/semantic.min.css';

class Login extends Component {
    state = {
            email: "",
            password: ""
        };
    passwordTarget={};


    inputHandler = async(e)=>{
        await this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const {history, updateBlogsMessage, updateLoginMessage, setToken, setAuthorEmail} = this.props;

        axios.post(`http://localhost:5000/user/login/`, this.state)
        .then((res)=>{
            setAuthorEmail(res.data.email);
            updateBlogsMessage("Welcome "+res.data.fullname);
            setToken(res.data.token);
            history.push("/blogs");    
        })
        .catch(async(err)=>{
            await updateLoginMessage(err.response.data)
            history.push("/login");
        })

    }
    render () {
        const {preLoginMessage, token, history} = this.props;
        return (
            <div>
                {!token &&
                <form className="form" onSubmit={this.handleSubmit}>
                    {preLoginMessage && <h3>{preLoginMessage}</h3>}
                    <h1>Login</h1>
                    <label>Email*:</label> 
                    <input id="email" type="email" value={this.state.email} onChange={this.inputHandler}
                        placeholder="Enter email address" required/>
                    
                    <label>Password*:</label> 
                    <input id="password" type="password" value={this.state.password} onChange={this.inputHandler} 
                        placeholder="Enter password" required/>
                    <input className="submit-button" type="submit" value="Login"/>
                </form> }
                {token && history.push("/blogs")}
            </div>
        );
    }
}

export default Login;