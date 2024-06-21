const mongoose = require('mongoose');

const employeSchema = mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true, unique : true},
    position : {type : String ,required : true},
    department : {type : String},
    salary : {type : Number},
});

exports.Employee = mongoose.model('Employee' , employeSchema);