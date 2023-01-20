import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectionString = process.env.CONNECTION_STRING

const options = {
     user:'',
     pass:'',
     useNewUrlParser: true,
     useUnifiedTopology: true
}

const ConnectDB = async () => {
     try {
        let db = await mongoose.connect(connectionString, options)
        console.log(('Database Connection established:' + db.connection.host).america);
     } catch (error) {
        console.log('Database connection error!');   
     }
}


export default ConnectDB;