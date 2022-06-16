'use strict';

module.exports = (capability) => {
    // 'update'
    return (req, res, next) => {
        try {
            // user can do action
            if (req.user.actions.includes(capability)) {
                next();
            } else {
                next('Access Denied');
            }
        } catch (e) {
            next('invalid login')
        }
    }
}