const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const db=knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'admin',
      database : 'Yash'
    }
  });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.post('/signin',(req,res)=>{
    if(!req.body.email || ! req.body.password)
    {
        return res.status(400).json('Fields Empty');
    }
    //req.body.password=cryptr.decrypt(req.body.password);
    db.select('email' , 'hash').from('login')
    .where('email','=',req.body.email)
    .then( data => {
        const isValid = bcrypt.compareSync(req.body.password,data[0].hash);
        if(isValid)
        {
            db.select('*').from('login')
            .where('email','=',req.body.email)
            .then(user =>{
                res.json(user);
            })
            .catch(err => res.status(400).json(err))
        }
        else
        res.status(400).json('Wrong credentials');
    })
    .catch(err => res.status(400).json(err))
});

app.post('/register',(req,res)=>{
    if(!req.body.name || !req.body.email || ! req.body.password)
    {
        return res.status(400).json('Fields Empty');
    }
    const { name , email , password } = req.body;
    db('login')
    .returning('*')
    .insert({
        email: email,
        name: name,
        hash:password
    }
    )
    .then(response=>{
        res.json(response);
    })
    .catch(err => res.status(400).json('Enter Something'));
});

app.post('/newentry',(req,res)=>{
    if(!req.body.platform || !req.body.userid || !req.body.password)
    {
        return res.status(400).json('Fields Empty');
    }
    const { id,platform , userid , password } = req.body;
    db('keys')
    .returning('*')
    .insert({
        auid: id,
        userid: userid,
        platform: platform,
        keyss:password
    }
    )
    .then(response=>{
        res.json(response);
    })
    .catch(err => res.status(400).json(err));
});

app.post('/getdetails',(req,res)=>{
    if(!req.body.platform)
    {
        return res.status(400).json('Empty Platform');
    }
    const { id , platform } = req.body;
    db.select('*').from('keys')
    .where('platform','=',platform)
    .andWhere('auid','=',id)
    .then(user =>{
        if(user[0].auid)
        res.json(user);
        else
        res.status(400).json('Invalid Platform');
    })
    .catch(err => res.status(400).json(err))
});

app.listen(process.env.PORT || 3001);