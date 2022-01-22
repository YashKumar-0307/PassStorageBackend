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
    required: true
    //unique: true
},
keyss:
{
    type: String,
    notnull:true,
    required: true
},
}, 
{  
    collection:'keys',
    timestamps: true,
});

keysSchema.index({auid:1,platform:1},{unique:true});

module.exports = mongoose.model('Keys', keysSchema);