const router = require('express').Router({});
const bodyParser = require('body-parser');
const _ = require('./../helper');
const lightController = require('./../controller/light');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/reset', (req, res) => {
    lightController.clear();
    _.requestSucceed(req, res, 'lights reset');
});

router.get('/blink', (req, res) => {
    const lightId = req.param('lightId');
    console.log(lightId);
    if (!lightId || !_.isNumeric(lightId)) {
        _.requestFailed(req, res, 'unknown light');
    }

    console.log(lightId);
    lightController.blink(lightId);

    _.requestSucceed(req, res, 'light will blink');
});

router.get('/full', (req, res) => {
    lightController.full();
    _.requestSucceed(req, res, 'full enabled');
});

router.get(function(err, req, res, next) {
    console.error(err);
    _.requestFailed(req, res, err.message);
});

module.exports = router;