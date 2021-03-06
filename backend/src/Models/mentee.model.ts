import mongoose, { Model, Schema } from "mongoose";
import MenteeInterface from "../Interfaces/mentee.interface";

const menteeSchema: Schema = new Schema(
  {
    views_id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: true },
    dateOfBirth: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Mentee = mongoose.model<MenteeInterface>("Mentee", menteeSchema);
export default Mentee;
