const nodemailer = require('nodemailer');
nodemailer.createTestAccount((err, account) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
      user: process.env.SMTP_MAIL, // generated ethereal user
      pass: process.env.SMTP_PASSWORD // generated ethereal password
    }
  });  
});  
  

const sendMail = (email, subject, message) => {
  // setup email data with unicode symbols
  try {
    let mailOptions = {
        from: process.env.SMTP_MAIL, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: message // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Message sent:'+ info.response);
        }
      });


  } catch (error) {
    
  }
 
}
module.exports = { sendMail };
