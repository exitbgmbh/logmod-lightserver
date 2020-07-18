const processRunningAsRoot = require('is-root');

/**
 * checks if parameter is numeric
 *
 * @param n
 * @returns {boolean}
 */
const isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

/**
 * @param {Object} req
 * @param {Object} res
 * @param {string} message
 * @param {Object} responseData
 */
const requestSucceed = (req, res, message, responseData) => {
    res.send({success: true, message: message || 'request succeed', data: responseData})
};

/**
 * @param {Object} req
 * @param {Object} res
 * @param {string} message
 */
const requestFailed = (req, res, message) => {
    res.status(500).send({success: false, message: message || 'request failed'})
};

/**
 * checks is node process is running as root user
 * (this is necessary for ws2812 lib)
 *
 * @returns {boolean}
 */
const checkRoot = () => {
    return process.env.NODE_ENV === 'dev' ? true : processRunningAsRoot
};

module.exports = {
    isNumeric,
    requestFailed,
    requestSucceed,
    checkRoot
};