const mongoose = require('mongoose');

require('dotenv').config()


//Mongoose connect (MongoDB)

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true},
    () => console.log('connected to database MongoDB')
);