const nodemailer = require("nodemailer");
const { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } = require("../emailTemplate")

const transporter = nodemailer.createTransport({
 // host: "smtp-mail.outlook.com",
 service: "gmail",
 port: 465, // Port for TLS
 secure: true, // Set to false since port 587 is not secure by default
 auth: {
  user: process.env.NODE_MAILER_USERNAME, // Your email
  pass: process.env.NODE_MAILER_PASSWORD, // Your email password or app-specific password
 },
});



module.exports = async ({ email = "ahmed.booley@gmail.com", OTP, message = "Email Verification", isEmail = true, token }) => {

 try {
  await transporter.verify()
  const info = await transporter.sendMail({
   from: '"DevFawzey" <devfawzey@gmail.com>',
   to: email,
   subject: "Verification", // Subject line
   text: message, // plain text body
   html: isEmail ? VERIFICATION_EMAIL_TEMPLATE.replace("{code}", OTP) : PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", `${process.env.BASE_URL}/api/v1/auth/reset-password?token=${token}&email=${email}`), // html body
  }).catch(err => {
   throw err
  })

  return info

 } catch (error) {
  throw error
 }

}

