const nodemailer = require('nodemailer');

const sendEmailOtp = async (email, otp) => {
  // Config for Gmail (or use Ethereal for fake testing)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Put your gmail in .env
      pass: process.env.EMAIL_PASS  // Put your App Password in .env
    }
  });

  const mailOptions = {
    from: '"HealthSync Security" <no-reply@healthsync.com>',
    to: email,
    subject: 'Your Verification Code',
    text: `Your HealthSync verification code is: ${otp}. It expires in 5 minutes.`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmailOtp;