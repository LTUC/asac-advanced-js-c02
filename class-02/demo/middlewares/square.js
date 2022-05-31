'use strict';

// wrong way
// module.exports = (number, req, res, next) => {
//     console.log(number * number);
//     next();
// }

// function square() {
//     return (req, res, next) => {
//         console.log('req.params.id => ', req.params.id);
//         let id = parseInt(req.params.id);
//         console.log(typeof id);
//         req.number = id * id;
//         next();
//     }
// }


// function square(n) {
//     return (req, res, next) => {
//         req.number = n * n;
//         next();
//     }
// }

function square() {
    return (req, res, next) => {
        console.log('req.params.id => ', req.params.id);
        let id = parseInt(req.params.id);
        console.log(typeof id);
        req.number = id * id;
        next();
    }
}

module.exports = square;