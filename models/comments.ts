/* eslint-disable @typescript-eslint/naming-convention */
import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "../utils/config.js";

type TComment = {
  content: string;
};

dotenv.config();

const { MONGO_URI } = config;

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connecting to MongoDB", err.message);
  });

const commentSchema = new mongoose.Schema({
  content: String,
});

commentSchema.set("toJSON", {
  transform(document, returnedObject) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Comment = mongoose.model<TComment>("Comment", commentSchema);

export default Comment;
