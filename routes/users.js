var express = require('express');
var tweetController = require('../controllers/tweetController');
var router = express.Router();

/* GET users listing. */
router.get('/', tweetController.GetOneTweet);

router.get('/todos',tweetController.getAll);

router.post('/',tweetController.NewTweet);

router.delete('/',tweetController.DeleteSomeTweet);

router.put('/',tweetController.update);

//router.put('/',());
//router.delete('/',)

module.exports = router;
