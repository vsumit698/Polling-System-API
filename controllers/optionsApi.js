const optionModel = require('../models/optionModel');
const questionModel = require('../models/questionModel');



module.exports.createOption = async function(req,res){
    try {
        var optionText = req.body.text.toLowerCase();

        var question = await questionModel.findById(req.params.id);

        if(!question){
            return res.status(200).json({
                message : "Question Not Found :("
            });
        }

        var optionArr = question.options;
        for(let id of optionArr){
            let option = await optionModel.findById(id);
            if(option.text == optionText){
                return res.status(200).json({
                    message : "Option Already Exists :("
                });
            }
        }
        // time to create a option to question
        var newOption = await optionModel.create({text : optionText, votes : 0, question : question._id});
        newOption.link_to_vote = `http://localhost:8000/options/${newOption.id}/add_vote`;
        newOption.save();

        question.options.push(newOption._id);
        question.save();

        res.status(200).json({
            message : "Option Created :) "
        });

    } catch (error) {
        return res.status(200).json({
            message : "error occurred at Server :(" + error
        });
    }
};


module.exports.upvoteOption = async function(req,res){
    try {
        var option = await optionModel.findById(req.params.id);
        if(option){
            option.votes += 1;
            option.save();
            return res.status(200).json({
                message : "Option UPVOTED :) "
            });
        }
        res.status(200).json({
            message : "Option Not Found :( "
        });
    } catch (error) {
        return res.status(200).json({
            message : "error occurred at Server :(" + error
        });
    }
};


module.exports.deleteOption = async function(req,res){
    try {
        var option = await optionModel.findById(req.params.id);
        if(option){
            
            if(option.votes>0){
                // Option Can't Deleted due to its votes
                return res.status(200).json({
                    message : "Option Can't Deleted due to its votes :( "
                });
            }

            // Option is available to delete 
            var question = await questionModel.findById(option.question);
            var queOptions = question.options;
            for(let i in queOptions){
                if(queOptions[i] == option.id){
                    queOptions.splice(i,1);
                    question.save();
                    break;
                }
            }

            await optionModel.findByIdAndDelete(option.id);

            res.status(200).json({
                message : "Option Deleted :)"
            });
        }else{
            res.status(200).json({
                message : "Option Not Found :( "
            });
        }

    } catch (error) {
        return res.status(200).json({
            message : "error occurred at Server :(" + error
        });
    }
}