const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    text : {
        type : String,
        required : true,
    },
    votes : {
        type : Number
    },
    link_to_vote : {
        type : String
    },
    question : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'questionModel'
    }
});

const optionModel = mongoose.model('optionModel',optionSchema);
module.exports = optionModel;