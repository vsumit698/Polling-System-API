const router = require('express').Router();
const questionAPI = require('../controllers/questionsApi');
const optionsAPI = require('../controllers/optionsApi');

// path is ----------/questions

router.post('/create',questionAPI.createQuestion);// to create a question 

router.post('/:id/options/create',optionsAPI.createOption);// to create a option for specific Question 

router.delete('/:id/delete',questionAPI.deleteQuestion);// to delete a question

router.get('/:id',questionAPI.viewQuestion);// to view a question

module.exports = router;