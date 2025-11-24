const mongoose = require('mongoose');

let isConnected = false;

async function dbconnect() {
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        isConnected = true;
        console.log("Database connected with server");
    } catch (e) {
        console.log("Database connection error: ", e);
        throw e;
    }
}


module.exports = dbconnect;