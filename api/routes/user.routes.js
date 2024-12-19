import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    participateEvent,
<<<<<<< HEAD
    pastEvents,
    pastEvents,
=======
>>>>>>> parent of 953e1ad (made api and pages for past events)
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/participate-Event").post(verifyJWT, participateEvent)
// router.route("/add-participateEvent-to-org").post(verifyJWT, participateEvent)

    
export default router