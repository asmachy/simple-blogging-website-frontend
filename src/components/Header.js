import React from "react";
import { Link } from 'react-router-dom';
export class Header extends React.Component {
    render () {
        const {token} = this.props;
        return (
            <nav className="navbar">
                <h1><Link className="links" to="/">  Simple Blogging Website </Link></h1>
                <div className="links">
                    {token && <Link to="/blogs/new-blog">Add blog</Link>}
                    <Link to="/">Blogs</Link>
                    {token && <Link to="/logout">Log Out</Link>}
                    {!token && <Link to="/login">Log In</Link> }
                    {!token && <Link to="/register" >Register</Link>}
                    
                </div>
            </nav>
        )
    }
}