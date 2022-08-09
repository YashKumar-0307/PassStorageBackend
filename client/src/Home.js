import Displaydta from './displaydta.js';
import React from 'react';
import './home.css';
//const Cryptr = require('cryptr');
//const cryptr = new Cryptr('myTotalySecretKey');

class Home extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={
      id:this.props.id,
      platform: '',
      userid:'',
      password:'',
      searplat:'',
      searuserid:'',
      searpass:'',
      searfound:false,
    }
  }

  onPlatformChange = (event) =>{
    this.setState({platform  : event.target.value});
  }

  onSearPlatformChange = (event) =>{
    this.setState({searplat  : event.target.value});
    //console.log(event.target.value);
  }

  onIdChange = (event) =>{
    this.setState({userid : event.target.value});
    //console.log(this.state.userid)
  }

  onPasswordChange = (event) =>{
    this.setState({password : event.target.value});
  }

  clearData = () =>{
    this.setState({
      id:this.props.id,
      platform: '',
      userid:'',
      password:''
    });
  }

  clearData1 = () =>{
    this.setState({
      id:this.props.id,
      searplat:'',
    });
  }

  onSubmitEntry= () => {
    if(!this.state.platform || !this.state.userid || !this.state.password)
    {
      console.log("Empty new entry fields");
      return;
    }
    fetch('http://localhost:3001/newentry',{
    //fetch('http://pass-storage.herokuapp.com/newentry',{
      method : 'post',
      headers : {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        id : this.state.id,
        platform: this.state.platform,
        userid : this.state.userid,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then((resp)=>{
      if(resp.registered)
      {
        alert("Registered");
        this.clearData();
      }
      else
      alert("Platform Already Exists");
    })
      .catch(err => {
        //alert("Platform already exists");
        console.log(err);
      })
  }

  onSearchEntry= () => {
    if(!this.state.searplat)
    {
      console.log("Empty Platform field");
      return;
    }
    this.setState({searfound: false});
    fetch('http://localhost:3001/getdetails',{
    //fetch('http://pass-storage.herokuapp.com/getdetails',{
      method : 'post',
      headers : {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        id : this.state.id,
        platform: this.state.searplat,
      })
    })
    .then(response => response.json())
    .then((user)=>{
      if(user)
      {
        this.setState({
          searuserid: user.userid,
          searpass: user.keyss,
          searfound: true,
        });
        if(!user.userid)
        {
          this.setState({searfound: false});
        }
        this.clearData1();
      }
      else{
        alert("Platform not found");
      }
    })
      .catch(err => console.log(err))
  }

  render()
  {
  const {cat} = this.props;
    if(cat === 'newentry')
    {
       return (
      <div>
       <article className="br3 ba b--black-10 mv4 w-100 w-50-m mw7 shadow-5 center">
          <main className="w-100 pa4 black-80">
            <div className="">
              <fieldset id="entry" className="center flex ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">New Entry</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="text">Platform</label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w10"
                    type="text"
                    name="platform-name-1"
                    id="platform-name-1"
                    value={this.state.platform}
                    onChange={this.onPlatformChange}
                  />
                </div>
                <div className="mt3 ma4">
                  <label className="db fw6 lh-copy f6" htmlFor="text">User Id</label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w10"
                    type="text"
                    name="email-address"
                    id="email-address"
                    value={this.state.userid}
                    onChange={this.onIdChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w10"
                    type="password"
                    name="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                  />
                </div>
              </fieldset>
              <div className="db let w10">
                <input
                  className="mb2 ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib"
                  type="submit"
                  value="Submit"
                  onClick={this.onSubmitEntry}
                />
              </div>
            </div>
          </main>
        </article>
        </div>);
    }
      else if (cat === 'search')
      {
        return(
        <div>
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m mw7 shadow-5 center">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="findsigninid" className="flex ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Search</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="text">Platform</label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    name="plat-name"
                    id="plat-name"
                    value={this.state.searplat}
                    onChange={this.onSearPlatformChange}
                  />
                </div>
                </fieldset>
                <div className='db center'>
                {<Displaydta condit={this.state.searfound} id={this.state.searuserid} pass={this.state.searpass}/>}
                <br></br>
                </div>
              <div className="">
                <input
                  className="mb2 ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib"
                  type="submit"
                  value="Submit"
                  onClick={this.onSearchEntry}
                />
              </div>
            </div>
          </main>
        </article>
        </div>);
      }
}
}

export default Home;