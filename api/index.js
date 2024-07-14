import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

//connect to database and log if successful
//uses env variable so we don't expose password for connecting to db
mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log("ERROR connecting to MongoDB")
});

const app = express();

app.listen(3000, () => {
    console.log('Server is on port 3000');
}); 