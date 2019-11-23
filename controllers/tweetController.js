var Tweet = require('../models/tweetModel');
var debug = require('debug')('BLOG3:tweetController');
var fecha = new Date();

module.exports.NewTweet = (req, res, next) => {
    Tweet.findOne({
            TweetID: req.body.TweetID
        })
        .then((foundUser) => {
            if (foundUser) {
                
                throw new Error(`TweetID Duplicado ${req.body.TweetID}`);
            } else {
                let tuit = new Tweet({
                    TweetID: req.body.TweetID,
                    Descripcion: req.body.Descripcion,
                    URL: req.body.URL,
                    Usuario: req.body.Usuario,
                    Fecha: fecha.getDay() 
                });
                return tuit.save();
            }
        }).then(user => { 
            return res

                .status(201)
                .json({
                    TweetID: req.body.TweetID
                });
        }).catch(err => {
            next(err);
        });
        
        res.render('index.pug');
}
module.exports.GetOneTweet = (req,res,next) =>{ 
        Tweet.findOne({
               TweetID: req.body.TweetID
            }, )
            .then((foundUser) => {
                if (foundUser)
                    return res.status(200).json(foundUser);
                else
                    return res.status(400).json(null)
            })
            .catch(err => {
                next(err);
            });
            
    
};

module.exports.getAll = (req, res, next) => {
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("Usert List",{size:perPage,page, sortby:sortProperty,sort});

   var tuit = Tweet.find({})
        .limit(perPage)
        .skip(perPage * page)
        .sort({ [sortProperty]: sort})
        .then((tweet) => {
           return res.status(200).json(tweet)
        }).catch(err => {
            next(err);
        })

};


module.exports.DeleteSomeTweet = async (req,res,next)=>{
        Tweet.findOneAndDelete({TweetID: req.body.TweetID})
        .then((data) =>{
            if (data) res.status(200).json(data);
            else res.status(404).send();
        }).catch(err => {
            next(err);
        })
    
};

module.exports.update =  (req, res, next) => {
    let update = req.body;

    Tweet.findOneAndUpdate({
            TweetID: req.body._id
        }, update, {
            new: true
        })
        .then((updated) => {
            if (updated)
                return res.status(200).json(updated);
            else
                return res.status(400).json(null);
        }).catch(err => {
            next(err);
        });
};
