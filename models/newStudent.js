const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newStudentSchema = Schema({
    userName : {type: String, required: true, unique : true},
    emailAddress : {type: String, required: true, unique : true},
    passWord: {type: String, required: true},
    idStudent: {type: String, required: true, unique: true},
    invoiceRef: {type: String, required: false, unique: true},
    titleForm: {type: String, required: false, unique: false},
    courseDetails: {type: String, required: false, unique: false},
    courseFees: {type: String, required: false, unique: false},
    
});

const NewStudent = mongoose.model('NewStudent', newStudentSchema);

module.exports = NewStudent;


// ref and mongoose.schema.types.objectid