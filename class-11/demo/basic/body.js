'use strict';
const Events = require('events');
const eventsPool = new Events();


// eventsPool.on('light', eyesLid);
// eventsPool.on('light', arms);

// function eyesLid() {
//     console.log('eyesLid closing');
// }
// function arms() {
//     console.log("Covering eyes");
// }

// eventsPool.emit('light');

eventsPool.on('light', eyesLid2);
eventsPool.on('light', arms2);

function eyesLid2(payload) {
    console.log('eyesLid closing', payload.brightness);
}
function arms2(payload) {
    console.log("Covering eyes", payload.brightness);
}

eventsPool.emit('light', { brightness: 75 });
eventsPool.emit('light', { brightness: 35 });
eventsPool.emit('light', { brightness: 10 });

// //method that we gonna use
// // step1 register the event(create it) using .on()
// eventsPool.on('hi', hiCallback);
// eventsPool.on('hi', hiCallback2);
// function hiCallback(payload) {
//     console.log(`Hi event received from ${payload}`);
// }
// function hiCallback2(payload) {
//     console.log(`Hi2 event received from ${payload}`);
// }

// // step2 is to fire or trigger the event using .emit()
// eventsPool.emit('hi', 'shihab');


// // eventsPool.on('submit', submitCallback);
// // function submitCallback(payload) {
// //     console.log('submit done');
// // }

// // eventsPool.emit('click');

// eventsPool.on('greeting', handleGreeting);
// eventsPool.on('greeting', handleAge);
// function handleGreeting(info) {
//     console.log(`Welcome ${info.firstName} ${info.lastName}`)
// }

// function handleAge(info) {
//     info.age < 22 ? console.log("you are young") : console.log(`you are ${info.age} years old`);
// }

// eventsPool.emit('greeting', { firstName: "shihab", lastName: "eshtaiwi", age: 36 });


// let count = 0;
// eventsPool.once('count', handleOnce);
// function handleOnce() {
//     count++;
//     console.log("the counter is ", count);
// }
// eventsPool.emit('count')
// eventsPool.emit('count')

// let sql = "DELETE FROM ANYTABLE WHERE id=$1;"
// let values = [req.query.id];
// client.query(sql, values).then(() => {
//     eventsPool.emit('delete', req.query.id);
//     res.send('record deleted');
// })

// eventsPool.on('delete', (data) => {
//     sendEmail({
//         to: 'admin@mysite.com',
//         subject: "someone deleted a record",
//         body: `Record id ${data} was removed`
//     });
// });