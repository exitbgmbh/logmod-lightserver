const express = require('express');
const port = process.env.PORT || 5000;
const ws281x = require('rpi-ws281x-native');

const startUp = () => {
    const app = express();
    
    ws281x.init(1, {});
    ws281x.init(16, {});
    
    //const blissSocketCtrl = require('./controller/blissSocket');
    //blissSocketCtrl.connect();
    
    //const configCtrl = require('./controller/config');
    //configCtrl.getStatusLight();
    
    //const lightAdmin = require('./controller/light');
    //lightAdmin.indicateSystemInitSuccess();
    
    //app.use('/api/config', require('./routes/config'));
    //app.use('/api/light', require('./routes/light'));
    //app.use('/api/system', require('./routes/system'));
    
    //app.listen(port, function() { console.log(`Ctrl-Server listening on port ${port}`); });
}

module.exports = {
    startUp
}


