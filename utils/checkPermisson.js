const { UnAuthorizeError } = require("../errors");

module.exports = (...roles) => {
 return (req, res, next) => {
  if (!roles.includes(req.user.role)) {
   throw new UnAuthorizeError("UnAuthorize to access this route")
  }
  next()
 }
}
// module.exports = (req, userID) => {

//  if (req.user.role === 'admin') return; // all good
//  if (req.user.userID === userID) return;
//  throw new UnAuthorizeError("UnAuthorize to access this route")
// }