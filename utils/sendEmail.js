const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    console.log('Creating email transporter with:', {
      host: process.env.SMTP_HOST || 'smtp.office365.com',
      port: process.env.SMTP_PORT || '587',
      user: process.env.SMTP_USER
    });

    // Create transporter for Outlook
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.office365.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false, // Use STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS // Use app password if MFA is enabled
      },
      tls: {
        rejectUnauthorized: false // Avoid certificate errors in some cases
      },
      debug: true
    });

    // Verify the connection configuration
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    // Define the email options
    const message = {
      from: `"Request Portal" <${process.env.SMTP_USER}>`,
      to: options.email,
      cc: options.cc || 'vamsidharareddy.alam_2026@woxsen.edu.in',
      subject: options.subject,
      html: options.html || options.message.replace(/\n/g, '<br>')
    };

    console.log('Sending email to:', options.email);
    console.log('Email subject:', options.subject);

    // Send the email
    const info = await transporter.sendMail(message);

    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));

    return info;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    console.error('Error details:', {
      code: error.code,
      command: error.command,
      response: error.response
    });
    throw error;
  }
};

module.exports = sendEmail;
