import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  icon: {
    type: String,
    required: [true, "icon is required"],
  },
  color: {
    type: String,
    required: [true, "Difficulty is required"],
  },

});

export const CategoryModel = mongoose.model("Category", categorySchema);
