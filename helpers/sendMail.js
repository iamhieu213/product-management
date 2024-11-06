const nodemailer = require('nodemailer');

module.exports.sendMail = (email, subject, html) => {
    // Tạo transporter dùng SMTP của Gmail
let transporter = nodemailer.createTransport({
    service: 'gmail', // hoặc 'smtp.gmail.com'
    auth: {
      user: process.env.EMAIL_TO_SEND, // Địa chỉ Gmail của bạn
      pass: process.env.PASSWORD_APP // Mật khẩu ứng dụng (hoặc mật khẩu Gmail nếu không dùng xác minh 2 bước)
    }
  });
  
  // Cấu hình email
  let mailOptions = {
    from: 'kenzoropp@gmail.com', // Địa chỉ email người gửi
    to: email, // Địa chỉ email người nhận
    subject: subject, // Tiêu đề email
    html: html, // Nội dung email dạng văn bản
    // html: '<h1>Hello</h1><p>This is a test email from Nodemailer!</p>' // Nội dung dạng HTML nếu cần
  };
  
  // Gửi email
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}