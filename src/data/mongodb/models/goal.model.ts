import mongoose, { Schema } from "mongoose";

const goalSchema = new Schema({
  title: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  difficulty: {
    type: Number,
    required: [true, "Difficulty is required"],
  },
  status: {
    type: String,
    required: [true, "Status is required"],
  },
  owner: {
    type: String,
    required: [true, "Owner is required"],
  },
  dates: {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
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
