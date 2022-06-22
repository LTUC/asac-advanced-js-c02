'use strict';
const events = require('./events-pool');
require('./body-parts/eyes/eyes');
require('./body-parts/arms/arms');

// events.emit("light", { brightness: 80 });
// events.emit("light", { brightness: 90 });
// events.emit("light", { brightness: 35 });

// events.on('light-detected', (payload) = {

// })

events.on('light-detected', notifyLight);
function notifyLight(payload) {
    events.emit('light', { brightness: payload })
}