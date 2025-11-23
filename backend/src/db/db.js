const mongoose = require('mongoose');


function dbconnect() {
    mongoose.connect(process.env.MONGOODB_URI)
        .then(()=> {
            console.log("Database connected with server");
        })
        .catch((e)=> {
            console.log("Database connection error: ", e);
        })
}

module.exports = dbconnect;