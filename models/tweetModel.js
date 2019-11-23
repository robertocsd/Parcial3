const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TweetSchema = Schema({
    TweetID: {
        type: String,
        required: true
    },
    Descripcion: String,
    URL: String,
    Usuario: String,
    Fecha: Date
}) 
module.exports= mongoose.model("Tweet",TweetSchema);