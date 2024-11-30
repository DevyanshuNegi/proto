import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Organisation } from "../models/organisation.model.js";
import { Event } from "../models/event.model.js";

const getallEvent = asyncHandler(async (req, res) => {
  const events = await Event.aggregate([
    { $match: { eventDate: { $gt: new Date() } } },
    {
      $project: {
        name: 1,
        description: 1,
        eventDate: {
          $dateToString: { format: "%Y-%m-%d", date: "$eventDate" },
        },
      },
    },
  ]);
  return res
    .status(201)
    .json(new ApiResponse(201, events, "Event added successfully"));
});

export { getallEvent };
