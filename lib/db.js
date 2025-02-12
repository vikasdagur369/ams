import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongoDB connected!")
    } catch (error) {
        console.log("error occured", error);
        
    }
}
export default connectDB;