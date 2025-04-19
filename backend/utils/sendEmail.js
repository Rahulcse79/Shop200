const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST || "mail.coraltele.com",
        port: parseInt(process.env.MAIL_PORT, 10),
        secure: process.env.MAIL_SECURE === 'true',
        auth: {
            user: process.env.MAIL_USER || "mailgateway@coraltele.com",
            pass: process.env.MAIL_PASSWORD || "%$#Maig#$&7634",
        },
    });

    const mailOptions = {
        from: `"Your App" <${process.env.MAIL_USER || "mailgateway@coraltele.com"}>`,
        to: options.email,
        subject: options.subject,
        html: options.message,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
