const isRoot = process.env.NODE_ENV === 'dev' ? () => {return true} : require('is-root');
const autoUpdater = require('./autoupdate');

if (!isRoot()) {
    console.log('must run as root');
    process.exit(99);
}

console.debug('calling autoupdater');
autoUpdater.fire('check');

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const configCtrl = require('./controller/config');
configCtrl.loadConfig();

const blissSocketCtrl = require('./controller/blissSocket');
blissSocketCtrl.connect();

// server configuration
const configRoutes = require('./routes/config');
app.use('/api/config', configRoutes);

// lights adapter
const lightTestRoutes = require('./routes/light');
app.use('/api/light', lightTestRoutes);

const systemRoutes = require('./routes/system');
app.use('/api/system', systemRoutes);

app.listen(port, function() { console.log(`Listening on port ${port}`); });
