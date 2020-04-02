const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    options :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'optionModel'
        } ]
});

const questionModel = mongoose.model('questionModel',questionSchema);
module.exports = questionModel;