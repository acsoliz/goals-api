import mongoose, { Schema } from "mongoose";

const wellcomeSchema = new Schema({
  message: {
    type: String,
    required: [true, "Message is required"],
    unique: true,
  },
});

export const WellcomeModel = mongoose.model("Wellcome", wellcomeSchema);
