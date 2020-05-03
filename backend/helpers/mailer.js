const nodemailer = require('nodemailer');
const config = require('../config');

async function send(message, type) {
    let transport = nodemailer.createTransport({
        host: config.mail.host,
        port: config.mail.port,
        auth: {
            user: config.mail.user,
            pass: config.secret.emailPass
        }
    });

    if(!type) {
        return transport.sendMail(message)
            .then((info) => {
                return info;
            })
            .catch((err) => {
                throw new Error(err);
            });
    } else if(type === "email_token"){
        return transport.sendMail({
            from: 'no-reply@glacier.alexmoras.com', // Sender address
            to: message.to,
            subject: 'Glacier Login Token', // Subject line
            html: '<p>Here is your Glacier magic-token: ' + message.token + '</p>'
        })
            .then((info) => {
                return info;
            })
            .catch((err) => {
                throw new Error(err);
            });
    }
}



module.exports = {
    send: send,
};