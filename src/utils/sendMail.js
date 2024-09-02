import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  auth: {
    user: 'user',
    pass: 'pass',
  },
});
