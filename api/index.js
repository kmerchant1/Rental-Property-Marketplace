import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config()


//connect to database and log if successful
//uses env variable so we don't expose password for connecting to db
mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log("ERROR connecting to MongoDB")
});

const app = express();
app.use(express.json())
app.listen(3000, () => {
    console.log('Server is on port 3000');
}); 


app.get('/test', (req, res) => {
    res.send('Hello world');
});

app.use("/api/user", userRouter);

app.use("/api/auth", authRouter);

