import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class LogoutDialogBox extends React.Component {
    
  logoutHandlerNo = (history)=>{
    history.push("/blogs");
  }

  logoutHandlerYes = async ( history)=>{
      const {setToken, setAuthorEmail, setIsLoggedIn} =  this.props;
    await setToken("");
    await setAuthorEmail("");
    await setIsLoggedIn(false);
    history.push("/");
  }
  
//   componentDidMount() {
//       const {isOpen, history, updateBlogsMessage} = this.props;
//     console.log("barbar ashtese isOpen", isOpen);
//     setTimeout(()=>{
//         if(!isOpen)
//          {
//             updateBlogsMessage("You Are Not Logged In");
//             history.push("/");
//         }
//     },2000)
    
//     // return <div></div>
//   }
    render() {
        const {updateBlogsMessage,isOpen, history} = this.props;
        const {logoutHandlerYes, logoutHandlerNo}= this;
        let dialog = (
            <Dialog
                open={isOpen}
                onClose={()=>logoutHandlerNo(history)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            > 
            <DialogTitle id="alert-dialog-title">{" Logout"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to logout?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>logoutHandlerNo(history)} color="primary">
                    Cancel
                </Button>
                <Button onClick={()=>logoutHandlerYes(history)} color="primary" autoFocus>
                    Logout
                </Button>
            </DialogActions>
            </Dialog>
        );

        if (!isOpen && document.cookie.split(';')[0].length<8) {
            // updateBlogsMessage("You are not logged in")
            dialog = (<div className = "blog-details"><h2>You are not logged in</h2></div>);
        }
        return (
            <div>{dialog}</div>
        );
    }
}

export default LogoutDialogBox;