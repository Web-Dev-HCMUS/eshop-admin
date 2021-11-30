const mongoose = require("mongoose");
require("dotenv").config();

async function connect(app) {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connect database successfully!");
    } catch (error) {
        console.log("Connect database fail!");
    }
}

module.exports = { connect };
