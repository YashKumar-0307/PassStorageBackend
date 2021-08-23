const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // id: 
    // {
    //     type: String,
    //     primarykey:true,
    //     required:true
    // },
    hash: 
    {
        type: String,
        required: true,
        notnull:true
    },
    email: 
    {
        type: String,
        required: true,
        notnull:true,
        unique: true,
    },
    name:
    {
        type: String,
        notnull:true,
    },
    }, 
    {  
        collection:'login',
        timestamps: true,
    });
    
    module.exports = mongoose.model('Login', loginSchema);