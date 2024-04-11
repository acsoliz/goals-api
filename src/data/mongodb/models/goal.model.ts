import mongoose, { Schema } from "mongoose";

const goalSchema = new Schema({
  title: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    unique: true,
  },
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  difficulty: {
    type: Number,
    required: [true, "difficulty is required"],
  },
  status: {
    type: String,
    required: [true, "status is required"],
  },
  // img: {
  //   type: String,
  // },
  // roles: {
  //   type: [String],
  //   default: ["USER_ROLE"],
  //   enum: ["USER_ROLE", "ADMIN_ROLE"],
  // },
});

export const GoalModel = mongoose.model("Goal", goalSchema);
