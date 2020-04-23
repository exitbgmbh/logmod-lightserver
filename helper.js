module.exports = {
    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },

    requestSucceed(req, res, message, responseData) {
        res.send({success: true, message: message || 'request succeed', data: responseData})
    },

    requestFailed(req, res, message) {
        res.status(500).send({success: false, message: message || 'request failed'})
    }
};