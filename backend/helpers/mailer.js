const nodemailer = require('nodemailer');

async function send(message, type, url) {
    let transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
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
        let html;
        if(url != null){
            html = "<p>Login with Glacier: <a href='" + unescape(url) + message.token + "'>" + unescape(url) + message.token + "</a></p>";
        } else {
            html = "<p>Here is your Glacier magic-token: ' + message.token + '</p>";
        }
        return transport.sendMail({
            from: 'no-reply@glacier.alexmoras.com', // Sender address
            to: message.to,
            subject: 'Glacier Login Token', // Subject line
            html: html
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