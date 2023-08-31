const mongoose = require('mongoose')


const mongoConnection = mongoose.connect('mongodb+srv://jessejitendra:iAv6641JDK1Z6Zml@cluster0.eint8vd.mongodb.net/lynkup')

try {
    mongoConnection

    console.log('connection has established ');
} catch (error) {

    console.log('Connection has not established Error- '. error.message);
}

module.exports = mongoConnection


