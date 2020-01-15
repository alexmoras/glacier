function hours(value) {
    let expiry = new Date(Date.now());
    expiry.setHours(expiry.getHours() + value);
    return expiry.valueOf();
}

module.exports = {
    hours: hours,
};