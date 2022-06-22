'use strict';
const events = require('../../events-pool');

events.on('light', armsMoving);
function armsMoving(payload) {
    if (payload.brightness >= 90) {
        console.log('Moving arms');
    }
}