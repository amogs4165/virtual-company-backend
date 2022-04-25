import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        const connect = await mongoose.connect('mongodb://localhost:27017/virtual_company');
        console.log(` MongoDB Connected: [ ${connect.connection.host} ]`);
    } catch (error) {
        console.error(`Mongo Error: ${error.message}`);
        process.exit(1);
    } finally {
        console.log(`------------------------------------------------------------------\n`);
    }
}