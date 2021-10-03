import mongoose from "mongoose";

const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
  { name: String, cuisine: String, restaurant_id: Number },
  { collection: "viewdata" }
);

const restaurant = mongoose.model("Restaurant", restaurantSchema);

export default restaurant;
