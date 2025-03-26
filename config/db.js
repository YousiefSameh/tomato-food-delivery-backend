import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://yousiefsameh:ANQLpBq3nb8QQy8i@cluster.3ezw1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster').then(() => {
      console.log(`MongoDB Connected Successfully`);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}