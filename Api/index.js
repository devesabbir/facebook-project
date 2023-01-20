import app from "./app.js";
import colos from "colors"
import dotenv from "dotenv"
import ConnectDB from './config/ConnectDB.js';
dotenv.config()

const port = process.env.PORT || 5050

  
app.listen(port, (err) => {
   ConnectDB()
   err ? console.log('Something went wrong!') : console.log(`Server Is Running ... on ${port} port`.america)
    
}) 