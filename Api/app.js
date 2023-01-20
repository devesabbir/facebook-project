import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import handleError from './middleware/ErrorHandle.js';

// import routes 
import routes from './routes/index.js';

// Configure
const app = express();
dotenv.config()
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(cors({
    origin:"*"
}))


// Routes 
app.use('/api/v1/', routes)



app.use( handleError )

export default app