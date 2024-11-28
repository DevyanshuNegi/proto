import { Router } from "express";
import { 
    registerOrganisation,
    loginOrganisation,
    logoutOrganisation,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentOrganisation,
    addEvent,
    
   
} from "../controllers/organisation.controller.js";

import { orgverifyJWT } from "../middlewares/orgAuth.middleware.js";
const router = Router()

router.route("/").get((req, res) => {
    console.log("Hello World");
    res.send("Hello World")
})
router.route("/register").post(registerOrganisation)

// router.route("/register").post(registerUser)

router.route("/login").post(loginOrganisation)

//secured routes
router.route("/logout").post(orgverifyJWT,  logoutOrganisation)
router.route("/add-event").post(orgverifyJWT, addEvent)

router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(orgverifyJWT, changeCurrentPassword)
// router.route("/current-user").get(orgverifyJWT, getCurrentOrganisation)


export default router