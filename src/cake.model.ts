import { model, Schema } from "mongoose";

const Cake = model(
  "Cake",
  new Schema(
    {
      title: String,
      rating: Number
    },
    {
      versionKey: false
    }
  )
);

export default Cake;
