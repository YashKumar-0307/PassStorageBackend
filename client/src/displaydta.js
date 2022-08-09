import React from 'react';

const Displaydta = ({condit,id,pass}) =>{
if(condit === true)
{
return(<div className ='ba db'>
<p className =''>Userid : {id}</p>
<p className =''>Password : {pass}</p>
</div>);
}
else
return null;
}

export default Displaydta;