import React from 'react';
const bcrypt = require('bcrypt-nodejs');

class Register extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email : '',
      password : '',
      name : '',
    }
    }

  onEmailChange = (event) =>{
    this.setState({email : event.target.value});
  }

  onNameChange = (event) =>{
    this.setState({name : event.target.value});
  }

  onPasswordChange = (event) =>{
    this.setState({password : event.target.value});
  }

  onRegister = () =>{
    const {loadUser, onButtonSubmit} = this.props;
     fetch('http://localhost:3001/register',{
    //fetch('http://pass-storage.herokuapp.com/register',{
      method : 'post',
      headers : {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password : bcrypt.hashSync(this.state.password),
        name: this.state.name
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data.loginset._id)
        {
          loadUser(data.loginset);
          onButtonSubmit();
        }
      else{
        alert("UserID taken! Please use another id");
      }
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  value={this.state.name}
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">UserID</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="email-address"
                  id="email-address"
                  value={this.state.email}
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  value={this.state.password}
                  onChange = {this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib"
                type="submit"
                value="Register"
                onClick={this.onRegister}
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;