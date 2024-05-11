import mongoose, { Schema } from "mongoose";

const activitySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  id_category: {
    type: String,
    required: [true, "id_category is required"],
  },
  frequency: {
    type: String,
    required: [true, "frequency is required"],
  },

});

export const ActivityModel = mongoose.model("Activity", activitySchema);
