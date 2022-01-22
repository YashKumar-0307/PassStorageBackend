import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Nav from './Nav.js';
import 'tachyons';
import Signin from './Signin.js';
import Register from './Register.js';
import Home from './Home.js';

const particlesOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}


class App extends Component 
{
  constructor() {
    super();
    this.state = {
      route : 'signin',
      isSignedIn : false,
      cat : 'newentry',
      user: {
        id: '',
        name: '',
        email: '',
      }
    }
  }

  onButtonSubmit = () =>{
    this.setState({route : 'home'});
    this.setState({isSignedIn: true});
  }

  onCatChange = (cat) =>{
    this.setState({cat : cat});
  }

  onRouteChange = (route) =>{
    if(route === 'signout')
    this.setState({isSignedIn: false});
    else if (route === 'home')
    this.setState({isSignedIn: true});
    this.setState({route : route});
  }

  loadUser = (data) =>{
    this.setState({
      user : {
        id: data._id,
        name: data.name,
        email: data.email,
      }
    })
  }

  render()
  {
    const {route,isSignedIn,cat} = this.state;
  return (
    <div className="App">
         <Particles className='particles'
          params={particlesOptions}
        />
        <Nav isSignedIn={isSignedIn} onCatChange={this.onCatChange} onRouteChange={this.onRouteChange} />
        {
          route === 'home'?
          <Home id={this.state.user.id} cat = {cat} />  
          :
          route === 'register'?
          <Register loadUser={this.loadUser} onButtonSubmit={this.onButtonSubmit} onRouteChange={this.onRouteChange} />
          :
          <Signin onButtonSubmit={this.onButtonSubmit} onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        }
    </div>
  );
  }
}
export default App;