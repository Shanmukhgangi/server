import mongoose from "mongoose";

export default async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error; // This will propagate the error to the caller
    }
}
