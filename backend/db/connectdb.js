import mongoose from 'mongoose';

export const connectdb = () => {
     mongoose
    .connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log('connection successful and db connected');
    })
    .catch((err) => {
      console.log(err);
    });
};
