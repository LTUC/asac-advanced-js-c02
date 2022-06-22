'use strict';
const events = require('../../events-pool');

events.on('light', eyesLid);
function eyesLid(payload) {
    if (payload.brightness >= 75) {
        console.log('closing eyes');
    }
}

setInterval(() => {
    let brightness = Math.ceil(Math.random() * 100);
    console.log("-------------------------------------");
    console.log("Brightness Detected: ", brightness);

    events.emit('light-detected', brightness);
}, 3000)