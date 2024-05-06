import nodemailer from 'nodemailer'
import { emailKeys } from '../config/emailConfig';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailKeys.user,
        pass: emailKeys.password,
    }
})

export async function sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
        from: emailKeys.user,
        to,
        subject,
        text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
    } catch (error) {
        console.error('Error sending email:', error)
    }
}
