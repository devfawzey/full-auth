const { UnAuthenticatedError } = require("../errors");
const verifyToken = require("../utils/verifyToken");

module.exports = async (req, res, next) => {

 try {
  const { token } = req.signedCookies
  // check if token is valid and exist
  const payload = verifyToken(token)
  // set user to response
  req.user = { userID: payload.userID, username: payload.username, role: payload.role }
  return next()
 } catch (err) {
  throw new UnAuthenticatedError("Authentication Invalid")
 }

}

/**@method===2 */
// module.exports = async (req, res, next) => {
//  const authHeader = req.headers.authorization;

//  if (!authHeader || !authHeader.startsWith("Bearer")) {
//   throw new UnAuthenticatedError('Invalid Authentication')
//  }

//  // token is there

//  try {

//   const token = authHeader.split(" ")[1]

//   const payload = verifyToken(token)

//   // and verified email
//   const user = await User.findById(payload.userID)

//   if (!user) {
//    throw new NotFoundError("User Is not found!!")
//   }
//   if (!user.isEmailVerified) {
//    throw new UnAuthenticatedError("Email not verified")
//   }

//   req.user = { userID: payload.userID, name: payload.name }
//   next()

//  } catch (err) {
//   throw new UnAuthenticatedError('Invalid Authentication...')
//  }

// }