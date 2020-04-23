const router = require('express').Router({});
const _ = require('./../helper');

function pong(req, res) {
    _.requestSucceed(req, res, 'pong');
}

router.get('/ping', pong)
    .post('/ping', pong);

module.exports = router;