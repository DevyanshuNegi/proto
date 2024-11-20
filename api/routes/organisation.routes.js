import { Router } from "express";
import { 
    registerOrganisation,
    loginOrganisation,
    logoutOrganisation,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentOrganisation
   
} from "../controllers/organisation.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/register").post( // MW, mainFunction

    upload.fields([ // accepts array
        {
            name: "eightyG",
            maxCount: 1
        },
        {
            name: "TwelveA",
            maxCount: 1
        }
    ]),
    registerOrganisation
)

// router.route("/register").post(registerUser)

router.route("/login").post(loginOrganisation)

//secured routes
router.route("/logout").post(verifyJWT,  logoutOrganisation)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
// router.route("/current-user").get(verifyJWT, getCurrentOrganisation)


export default router