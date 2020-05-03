function success(res, http_code, status_code, message) {
    if (!message) { message = "This action completed successfully but did not generate a message." }
    res.status(http_code).send({
        "success": true,
        "status": status_code,
        "message": message
    });
}

function failure(res, http_code, status_code, message, error) {
    if (!message) { message = "This action could not be completed. Please try again." }
    res.status(http_code).send({
        "success": false,
        "status": status_code,
        "message": message
    });
    if(error){
        console.log({
            "status": status_code,
            "message": message,
            "error": error
        });
    }
}

module.exports = {
    success : success,
    failure : failure,
}