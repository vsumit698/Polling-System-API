const router = require('express').Router();
const optionsAPI = require('../controllers/optionsApi');

// path is ----------/options

router.get('/:id/add_vote',optionsAPI.upvoteOption);// to vote a option for specific Question

router.delete('/:id/delete',optionsAPI.deleteOption);// to delete a option

module.exports = router;