import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.Promise = global.Promise;

const connection = mongoose.connect(process.env.MONGODB_URL, {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

connection
    .then((db) => {
        console.log('MongoDB connected successfully :)');
        return db;
    })
    .catch((err) => {
        console.log(err);
    });

export default connection;
