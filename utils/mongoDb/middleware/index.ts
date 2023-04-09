import mongoose from 'mongoose';

const connectDB = (handler:any) => async (req:any, res:any) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }

  // Use new db connection 
  // @ts-ignore
  await mongoose.connect(process.env.MONGODB_URL_1, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName:process.env.MONGO_DB_ENV_1
  });
  return handler(req, res);
};

export default connectDB;