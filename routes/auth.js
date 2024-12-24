const router = require("express").Router()
const { register, login, updateUser, verifyEmail, sendResetPasswordEmail, resetPassword, showCurrentUser, logout } = require("../controllers/auth")
const authenticationMiddleware = require("../middleware/auth")
const passport = require("passport")
const attchCookieToResponse = require("../utils/attchCookieToResponse")
const createJWT = require("../utils/createJWT")
const checkAlreadyLoggedIn = require("../middleware/checkAlreadyLoggedIn")

// Github Authentication
// must be loggedOut
router.get("/github", checkAlreadyLoggedIn, passport.authenticate("github", { scope: ['user:email'] }))
// Github callback
router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/" }), (req, res) => {
 const payload = { userID: req.user._id, username: req.user.username, role: req.user.role }
 // User is logged ◡̈◡̈◡̈◡̈◡̈◡̈◡̈◡̈
 attchCookieToResponse(res, createJWT(payload))
 // callBack to get user data {id,username,role:user}
 res.redirect("/api/v1/auth/me")
})
// must be loggedOut
router.post("/register", checkAlreadyLoggedIn, register)
// must be loggedOut
router.get("/verify-email", checkAlreadyLoggedIn, verifyEmail)
// must be loggedOut
router.post("/login", [checkAlreadyLoggedIn], login)
// must be loggedIn
router.get("/me", authenticationMiddleware, showCurrentUser)
// must be loggedIn
router.patch("/update", authenticationMiddleware, updateUser)
// must be loggedOut
router.post("/forgot-password", checkAlreadyLoggedIn, sendResetPasswordEmail)
// must be loggedOut
router.post("/reset-password", checkAlreadyLoggedIn, resetPassword)
// must be loggedIn
router.delete("/logout", authenticationMiddleware, logout)


module.exports = router