const router = require('express').Router({});
const bodyParser = require('body-parser');
const configCtrl = require('./../controller/config');
const _ = require('./../helper');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/', function(req, res) {
    let config = configCtrl.getConfig();
    _.requestSucceed(req, res, '', config);
});

router.get('/reset', function(req, res) {
    configCtrl.resetConfig();
    res.send({ response: true, message: 'config set back to default' });
});

router.get('/save', function(req, res) {
    configCtrl.saveConfig();
    res.send({ response: true, message: 'config saved' });
});

router.post('/set/:parameter', function(req, res) {
    const { parameter } = req.params,
        paramValue = req.body[parameter],
        functionName = 'set' + parameter.charAt(0).toUpperCase() + parameter.substr(1);

    if (!(typeof configCtrl[functionName] === 'function')) {
        _.requestFailed(req, res, 'unknown parameter');
        return;
    }

    configCtrl[functionName](paramValue);
    _.requestSucceed(req, res, parameter + ' set', paramValue)
});

router.get('/get/:parameter', function(req, res) {
    const { parameter } = req.params,
        functionName = 'get' + parameter.charAt(0).toUpperCase() + parameter.substr(1);

    if (!(typeof configCtrl[functionName] === 'function')) {
        _.requestFailed(req, res, 'unknown parameter');
        return;
    }

    let result = configCtrl[functionName]();
    _.requestSucceed(req, res, null, {[`${parameter}`]: result})
});

router.use(function(err, req, res, next) {
    console.error(err);
    _.requestFailed(req, res, err.message);
});

module.exports = router;