import mongoose from "mongoose";

const connectMongoDB= async ()=>{
    try{
        await mongoose.connect("mongodb+srv://pass:pass@cluster0.ijxrshd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Connect to mongodb")
    }catch(error){
        console.log("Error connecting mongoDB:",error)
    }
}

export default connectMongoDB;