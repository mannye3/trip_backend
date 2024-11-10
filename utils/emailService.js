import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL,PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from '../email/emailTemplates.js';

dotenv.config();
console.log('EMAIL:', process.env.EMAIL);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'Password set' : 'Password missing');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
        
    },
    // logger: true,  // Enable logger
    // debug: true    // Show detailed debug output
});



export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const emailContent = VERIFICATION_EMAIL_TEMPLATE.replace('{verificationToken}', verificationToken);

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Verify Your Email',
      html: emailContent
    };

    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
    //throw new Error('Failed to send verification email');
  }

}

export const sendWelcomeEmail = async (email, name) => {
  try {
    const emailContent = WELCOME_EMAIL.replace('{name}', name);

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Welcome to Our Platform!",
      html: emailContent
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
    //throw new Error('Failed to send welcome email');
  }
};


export const sendResetPasswordEmail = async (email, resetURL) => {
  try {
    if (!email) {
      console.log('Recipient email is required');
    }

    const emailContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL);

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Your Password",
      html: emailContent
    };

    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error.message);
    return false;
  }
};




export const sendResetSuccessEmail = async (email) => 
  {
     try {
    if (!email) {
      console.log('Recipient email is required');
    }

    const emailContent = PASSWORD_RESET_SUCCESS_TEMPLATE.replace('{email}', email);


    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Successfully", 
      html: emailContent
    };

    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error.message);
    return false;
  }
  }