import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2"
    }
});
