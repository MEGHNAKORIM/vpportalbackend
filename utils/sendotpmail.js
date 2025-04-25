const nodemailer = require('nodemailer');

const sendotpmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.office365.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false, // use TLS (STARTTLS)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        ciphers: 'SSLv3'
      },
      debug: true
    });

    await transporter.verify();

    const message = {
      from: `"VP Portal" <${process.env.SMTP_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.html || options.message.replace(/\n/g, '<br>')
    };

    const info = await transporter.sendMail(message);

    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);

    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendotpmail;
