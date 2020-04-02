const questionModel = require('../models/questionModel');
const optionModel = require('../models/optionModel');


module.exports.createQuestion = async function(req,res){
    try {
        var questionTitle = req.body.title.toLowerCase();
        
        var existTitle = await questionModel.findOne({title:questionTitle});
        if(existTitle){
            return res.status(200).json({
                message : "Question Already Exist :( "
            });
        }
        await questionModel.create({title : questionTitle});
        res.status(200).json({
            message : "Question created Successfully :("
        });
    } catch (error) {
        return res.status(200).json({
            message : "error occurred at Server :(" + error
        });
    }
};

module.exports.deleteQuestion = async function(req,res){
    try {
        var question = await questionModel.findById(req.params.id);
        if(question){
            var optionArr = question.options;
            for(let optId of optionArr){
                let option = await optionModel.findById(optId);
                if(option.votes > 0){
                    // question Can't Deleted due to its options votes
                    return res.status(200).json({
                        message : "question Can't Deleted due to its options votes"
                    });
                }
            }
            // question is available to delete  
            for(let optId of optionArr){
                // deleting options of question first 
                await optionModel.findByIdAndDelete(optId);
            }
            // deleting Question
            await questionModel.findByIdAndDelete(question._id);
            res.status(200).json({
                message : "Question Deleted :)"
            });
        }else{
            res.status(200).json({
                message : "Question Does Not Exist"
            });
        }
    } catch (error) {
        return res.status(200).json({
            message : "error occurred at Server :(" + error
        });
    }
}

module.exports.viewQuestion = async function(req,res){

    try {
        var question = await questionModel.findById(req.params.id);
        if(question){
            await question.populate('options').execPopulate();
            return res.status(200).json({
                Question : question
            });
        }
        res.status(200).json({
            message : "Question Does Not Exist"
        });
    } catch (error) {
        return res.status(200).json({
            message : "error occurred at Server :(" + error
        });
    }

}
