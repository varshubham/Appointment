const mongoose = require('mongoose')

const MONGOURI = "mongodb://0.0.0.0:27017/data";


const connectToMongo = () =>{
    mongoose.connect(MONGOURI)
    const mb = mongoose.connection;
    mb.on('error', console.error.bind(console, 'connection error:'));
    mb.once('open', function callback () {
        console.log("Started");
      });
}

module.exports = connectToMongo;