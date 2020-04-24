const express = require('express');
const configRoutes = require('./routes/config');
const lightTestRoutes = require('./routes/light');
const systemRoutes = require('./routes/system');

const runServer = (restartRequired = false) => {
    const app = express();
    const port = process.env.PORT || 5000;
    
    console.log('load config');
    const configCtrl = require('./controller/config');
    configCtrl.loadConfig();
    
    console.log('connecting websocket');
    const blissSocketCtrl = require('./controller/blissSocket');
    blissSocketCtrl.connect();
    
    app.use('/api/config', configRoutes);
    app.use('/api/light', lightTestRoutes);
    app.use('/api/system', systemRoutes);
    
    app.listen(port, function() { console.log(`Listening on port ${port}`); });
}

module.exports = runServer;