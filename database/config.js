const mongoose = require('mongoose');

const dbConnection = async () => {

    // mongodb+srv://mean_user:V8ydra1VUj2hoV8I@micluster.yax5y.mongodb.net/hospitaldb
    try {
        //await mongoose.connect('mongodb+srv://mean_user:V8ydra1VUj2hoV8I@micluster.yax5y.mongodb.net/hospitaldb');
        await mongoose.connect(process.env.DB_CNN);

        console.log('DB Online');

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    dbConnection
}