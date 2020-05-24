require('dotenv').config();
module.exports = {
    domain: "glacier.alexmoras.com",
    jwt_issuer: "glacier.alexmoras.com",
    jwt_exp: "24h",
    magic_link_exp: 24,
    service_domains: [
        "police.uk",
        "nhs.uk"
    ],
    mail_user: process.env.MAIL_USER || '',
    mail_pass: process.env.MAIL_PASS || '',
    mail_host: process.env.MAIL_HOST || '',
    mail_port: process.env.MAIL_PORT || '',
    db_user: process.env.DB_USER || '',
    db_pass: process.env.DB_PASS || '',
    db_url: process.env.DB_URL || '',
    sentry: process.env.SENTRY || '',
    jwt_private: process.env.JWT_PRIVATE || '',
    recaptcha_secret: process.env.RECAPTCHA_SECRET || ''
};