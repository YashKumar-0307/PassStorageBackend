const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const Cryptr = require('cryptr');
const mongoose = require('mongoose');
let keys = require('./models/keys.model');
let login = require('./models/login.model');
const cryptr = new Cryptr('myTotalySecretKey');
// const db=knex({
//     client: 'pg',
//     connection: process.env.DATABASE_URL,
//     //ssl:true,
//   });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const uri ="mongodb+srv://YKT:92399239@cluster-1.slcho.mongodb.net/PassStorage?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.post('/signin',(req,res)=>{
    if(!req.body.email || ! req.body.password)
    {
        return res.status(400).json('Fields Empty');
    }
    //req.body.password=cryptr.decrypt(req.body.password);
    // db.select('email' , 'hash').from('login')
    // .where('email','=',req.body.email)
    // .then( data => {
    //     const isValid = bcrypt.compareSync(req.body.password,data[0].hash);
    //     if(isValid)
    //     {
    //         db.select('*').from('login')
    //         .where('email','=',req.body.email)
    //         .then(user =>{
    //             res.json(user);
    //         })
    //         .catch(err => res.status(400).json(err))
    //     }
    //     else
    //     res.status(400).json('Wrong credentials');
    // })
    // .catch(err => res.status(400).json('Error Returned',err))
    
    //check
    login.findOne({ email:req.body.email},(err,logi)=>{
        if( err || !logi || !bcrypt.compareSync(req.body.password, logi.hash))
        {
            console.log(' Wrong username/password');
            return res.send(false)
        }
        else
        {
            console.log("True");
            res.json(user);
            return res.send(true)
        }
    })

    
});

app.post('/register',(req,res)=>{
    if(!req.body.name || !req.body.email || ! req.body.password)
    {
        return res.status(400).json('Fields Empty');
    }
    const { name , email , password } = req.body;
    // db('login')
    // .returning('*')
    // .insert({
    //     email: email,
    //     name: name,
    //     hash:password
    // }
    // )
    // .then(response=>{
    //     res.json(response);
    // })
    // .catch(err => res.status(400).json('Enter Something'));

    var idimage = new mongoose.Types.ObjectId();
    const logi=new login(
        {
            _id: idimage,
            hash: password,
            email: email,
            name: name,
        }
    )

    logi.save().then(result => {
        res.status(201).json({
            message: "User registered successfully!",
            loginset: {
                _id: result._id,
                hash: result.hash,
                email: result.email,
                name: result.name,
            }
        })
    })
    .catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })


});

app.post('/newentry',(req,res)=>{
    if(!req.body.platform || !req.body.userid || !req.body.password)
    {
        return res.status(400).json('Fields Empty');
    }
    const { id,platform , userid , password } = req.body;
    // db('keys')
    // .returning('*')
    // .insert({
    //     auid: id,
    //     userid: userid,
    //     platform: platform,
    //     keyss:password
    // }
    // )
    // .then(response=>{
    //     res.json(response);
    // })
    // .catch(err => res.status(400).json(err));
   
    var idimage1 = new mongoose.Types.ObjectId();
    const ke=new keys(
        {
            _id: idimage1,
            auid: id,
            userid: userid,
            platform:platform,
            keyss:password,
        }
    )
    ke.save().then(result => {
        res.status(201).json({
            message: "User registered successfully!",
            keyset: {
                _id: result._id,
                auid: result.auid,
                userid: result.userid,
                platform: result.platform,
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({  error: err  });
    })

});

app.post('/getdetails',(req,res)=>{
    if(!req.body.platform)
    {
        return res.status(400).json('Empty Platform');
    }
    const { id , platform } = req.body;
    // db.select('*').from('keys')
    // .where('platform','=',platform)
    // .andWhere('auid','=',id)
    // .then(user =>{
    //     if(user[0].auid)
    //     res.json(user);
    //     else
    //     res.status(400).json('Invalid Platform');
    // })
    // .catch(err => res.status(400).json(err))

    keys.findOne({ platform: platform ,auid: id},(err,ke)=>{
        if(err)
        {
            return res.status(400).json(err)
        }

        if( ke.auid )
        {
            res.json(ke);
        }
        else
        {
            res.status(400).json('Invalid Platform');
        }
    });
});

app.listen(process.env.PORT || 3001);