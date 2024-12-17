import { Router } from "express";
import { 
    getallUpcomingUserEvent,
    getallUpcomingEvent,
    
   
} from "../controllers/event.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { orgverifyJWT } from "../middlewares/orgAuth.middleware.js";
const router = Router()

// router.route("/").get((req, res) => {
//     console.log("Hello World");
//     res.send("Hello World")
// })
router.route("/getUpcomingEvents").get(verifyJWT, getallUpcomingEvent)
router.route("/getUpcomingUserEvents").get(verifyJWT, getallUpcomingUserEvent)

// router.route("/register").post(registerUser)

// router.route("/login").post(loginOrganisation)

//secured routes
// router.route("/logout").post(orgverifyJWT,  logoutOrganisation)
// router.route("/current-org").get(orgverifyJWT, getCurrentOrganisation)

// router.route("/refresh-token").post(refreshAccessToken)
// router.route("/change-password").post(orgverifyJWT, changeCurrentPassword)
// router.route("/current-user").get(orgverifyJWT, getCurrentOrganisation)


export default router