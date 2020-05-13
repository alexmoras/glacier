const nodemailer = require('nodemailer');
const config = require('../config');

async function send(message) {
    let transport = nodemailer.createTransport({
        host: config.mail.host,
        port: config.mail.port,
        auth: {
            user: config.mail.user,
            pass: config.secret.emailPass
        }
    });

    return transport.sendMail(message)
        .then((info) => {
            return info;
        })
        .catch((err) => {
            throw new Error(err);
        });
}



module.exports = {
    send: send,
};