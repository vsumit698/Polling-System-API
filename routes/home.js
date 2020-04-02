const router = require('express').Router();

const questionsRouter = require('./question');
const optionsRouter = require('./option');

router.use('/questions',questionsRouter);//handle all the Questions Routes

router.use('/options',optionsRouter);//handle all the options Routes

module.exports = router;