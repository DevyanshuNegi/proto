import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    organizedBy: {
      type: Schema.Types.ObjectId,
      ref: "Organisation",
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventVenue: {
      type: String,
      required: true,
      trim: true,
    },
    volunteer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    participants: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
