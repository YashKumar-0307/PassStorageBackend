import React from 'react';
//const bcrypt = require('bcrypt-nodejs');
//const cors = require('cors');
//const Cryptr = require('cryptr');
//const cryptr = new Cryptr(/*this.state.ckey*/'asgdxv');
class Signin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email : '',
      password : '',
  //    ckey : ''
    }
  }

 // chshkey = () =>{
   // fetch('http://localhost:3001/')
 //   .then(response => response.json())
   // .then((data)=>{
 //     this.setState({ckey : data[0]});
   // })
  //}

  

  onEmailChange = (event) =>{
    this.setState({email : event.target.value});
  }

  onPasswordChange = (event) =>{
    this.setState({password : event.target.value});
  }

  onSignIn = () =>{ 
  //  this.chshkey;
    //this.setState({password : cryptr.encrypt(this.state.password)})
    fetch('http://localhost:3001/signin',{
    //fetch('http://pass-storage.herokuapp.com/signin',{
      method : 'post',
      headers : {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password : this.state.password,
      })
    })
    .then(response => response.json())
    .then(user => {
    //  this.setState({ckey : ''});
      if(user._id)
      {
        this.props.loadUser(user);
        this.props.onButtonSubmit();
      }
      else
      {
        alert(' Wrong username/password');
      }
    })
    .catch(err => console.log(err))
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">UserID</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="email-address"
                  id="email-address"
                  onChange = {this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3" >
              <p  className="f6 link dim black db pointer" onClick={() => onRouteChange ('register')} >Register</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}
export default Signin;