import React from 'react';
import 'tachyons';

const Nav = ({isSignedIn,onCatChange,onRouteChange}) => {
if ( isSignedIn === true)
return(
<nav style ={{display:"flex", justifyContent: 'flex center'}}>
    <p className = 'f3 link dim black underline pa3 pointer mr1' onClick = {() => onCatChange('newentry')}>New Entry</p>
    <p className = 'f3 link dim black underline pa3 pointer mr-auto' onClick = {() => onCatChange('search')}>Search</p>
    <p className = 'f3 link dim black underline pa3 pointer ml-auto'  onClick = {() => onRouteChange('signout')}>Sign Out</p>
</nav>
);
else
return(
    <nav style ={{display:"flex", justifyContent: 'flex center'}}>
        <p className = 'f3 link dim black underline pa3 pointer ml-auto mr1' onClick = {() => onRouteChange('signin')}>Sign In</p>
        <p className = 'f3 link dim black underline pa3 pointer' onClick = {() => onRouteChange('register')}>Register</p>
    </nav>
    );}
export default Nav;