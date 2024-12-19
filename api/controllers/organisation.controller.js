import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Organisation } from "../models/organisation.model.js";
import { Event } from "../models/event.model.js";

const generateAccessAndRefereshTokens = async (organisationId) => {
  try {
    const organisation = await Organisation.findById(organisationId);
    const accessToken = organisation.generateAccessToken();
    const refreshToken = organisation.generateRefreshToken();

    organisation.refreshToken = refreshToken;
    await organisation.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerOrganisation = asyncHandler(async (req, res) => {
  // get organisation details from frontend
  // validation - not empty
  // check if organisation already exists: organisationname, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create organisation object - create entry in db
  // remove password and refresh token field from response
  // check for organisation creation
  // return res

  const { name, email, description, password, started_at } = req.body;
  console.log("email: ", email);

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // const existedOrganisation = await Organisation.findOne({
  //     $or: [{ leader_mail }, { name }]
  // })
  const existedOrganisation = await Organisation.findOne({ email });

  if (existedOrganisation) {
    throw new ApiError(409, "organisation with email already exists");
  }
  // //console.log(req.files);
  // // TODO: check pdfs also
  // const avatarLocalPath = req.files?.avatar[0]?.path;
  // //const coverImageLocalPath = req.files?.coverImage[0]?.path;
  // let coverImageLocalPath;
  // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
  //     coverImageLocalPath = req.files.coverImage[0].path
  // }

  // if (!avatarLocalPath) {
  //     throw new ApiError(400, "Avatar file is required")
  // }

  // const avatar = await uploadOnCloudinary(avatarLocalPath)
  // const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  // if (!avatar) {
  //     throw new ApiError(400, "Avatar file is required")
  // }

  const organisation = await Organisation.create({
    email,
    password,
    name: name,
    description: description,
    started_at: started_at,
  });

  const createdOrganisation = await Organisation.findById(
    organisation._id
  ).select("-password -refreshToken");

  if (!createdOrganisation) {
    throw new ApiError(
      500,
      "Something went wrong while registering the organisation"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createdOrganisation,
        "organisation registered Successfully"
      )
    );
});

const loginOrganisation = asyncHandler(async (req, res) => {
  // req body -> data
  // organisationname or email
  //find the organisation
  //password check
  //access and referesh token
  //send cookie

  const { email, password } = req.body;
  console.log(email);
  console.log(password);

  if (!email) {
    // throw new ApiError(400, "organisationname or email is required")
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "organisationname or email is required"));
  }
  if (!password) {
    // throw new ApiError(400, "organisationname or email is required")
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "organisationname or email is required"));
  }

  const organisation = await Organisation.findOne({
    email,
  });

  if (!organisation) {
    // throw new ApiError(404, "organisation does not exist")
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "organisation does not exist"));
  }

  const isPasswordValid = await organisation.isPasswordCorrect(password);
  console.log("ispassword correct ", isPasswordValid);
  if (!isPasswordValid) {
    // throw new ApiError(401, "Invalid organisation credentials")
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Invalid organisation credentials"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    organisation._id
  );

  const loggedInorganisation = await Organisation.findById(
    organisation._id
  ).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          organisation: loggedInorganisation,
          accessToken,
          refreshToken,
        },
        "organisation logged In Successfully"
      )
    );
});

const logoutOrganisation = asyncHandler(async (req, res) => {
  await Organisation.findByIdAndUpdate(
    req.organisation._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "organisation logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const organisation = await organisation.findById(decodedToken?._id);

    if (!organisation) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== organisation?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(organisation._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const organisation = await organisation.findById(req.organisation?._id);
  const isPasswordCorrect = await organisation.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  organisation.password = newPassword;
  await organisation.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentOrganisation = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        req.organisation,
        "organisation fetched successfully"
      )
    );
});

const addEvent = asyncHandler(async (req, res) => {
  const { name, organizedBy, date, time, location, description } = req.body;

  console.log(name, organizedBy, date, time, location, description);

  if (!name || !organizedBy || !location) {
    // throw new ApiError(400, "All fields are required")
    return res
      .status(400)
      .json(new ApiError(400, {}, "All fields are required"));
  }
  console.log(req.organisation._id);
  const event = await Event.create({
    name: name.toUpperCase(),
    eventDate: date,
    eventVenue: location,
    eventTime: time,
    description,
    organizedBy: req.organisation._id,
  });
  console.log("before add event saved ^_^");
  return res
    .status(201)
    .json(new ApiResponse(201, event, "Event added successfully"));
});
const getAllEvents = asyncHandler(async (req, res) => {
  console.log("first get all events saved ^_^");
  // console.log(req.organisation._id)
  // const events = await Event.aggregate([
  //   { $match: { organisedBy: new mongoose.Types.ObjectId(req.organisation._id) } },
  // ]);
  const events = await Event.find({ organizedBy: req.organisation._id });
  console.log(events);
  return res
    .status(201)
    .json(new ApiResponse(201, events, "Event added successfully"));
});

export {
  registerOrganisation,
  loginOrganisation,
  logoutOrganisation,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentOrganisation,
  addEvent,
  getAllEvents,
};
