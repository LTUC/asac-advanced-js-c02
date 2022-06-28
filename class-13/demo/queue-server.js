'use strict';

const io = require('socket.io')(3000)
const uuid = require('uuid').v4;

const msgQueue = {
    tasks: {

    }
}

const family = io.of('/family');
family.on('connection', (socket) => {

    socket.on('new_task', (payload) => {
        console.log('parent is adding new task');
        const id = uuid();//this will create for me a unique id
        // msgQueue = {
        //     tasks: {
        //         '32ennn32323223ijij': 'clean your room',
        //         'y23rrfeefeveve4343': 'wash you face',
        //         '42r545ggt66tve4646': 'wear you clothes',
        //         't23rr3424ffrt5565y': 'eat your food',
        //     }
        // }
        msgQueue.tasks[id] = payload;
        socket.emit('added', payload);
        family.emit('task', {
            id: id,
            payload: msgQueue.tasks[id]
        });
    });

    socket.on('get_all', () => {
        console.log('get all tasks');

        // ['32ennn32323223ijij', 'y23rrfeefeveve4343', '42r545ggt66tve4646', 't23rr3424ffrt5565y']
        Object.keys(msgQueue.tasks).forEach((id) => {
            socket.emit('task', {
                id: id,
                payload: msgQueue.tasks[id]
            })
        })
    })

    socket.on('received', (task) => {
        //this will remove the task from the msgQueue
        delete msgQueue.tasks[task.id];
        console.log('task done and deleted');
    })
})