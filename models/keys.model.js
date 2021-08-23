const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const keysSchema = new Schema({
_id:mongoose.Schema.Types.ObjectId,
// pkey: 
// {
//     type: String,
//     primarykey:true,
//     required:true
// },
auid: 
{
    type: String,
    required: true,
    notnull:true,
    unique: true
},
userid: 
{
    type: String,
    required: true,
    notnull:true,
},
platform:
{
    type: String,
    notnull:true,
    unique: true
},
keyss:
{
    type: String,
    notnull:true,
},
}, 
{  
    collection:'keys',
    timestamps: true,
});

module.exports = mongoose.model('Keys', keysSchema);