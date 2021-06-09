import React from "react";
import Blogs from "./Blogs"


export class Home extends React.Component {
    
    
    render () {
        
        const {blogs} = this.state;
        return(
            <div>
                <Blogs blogs={blogs}/>
            </div>
        )
    }
}