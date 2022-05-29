
module.exports = (req, res, next) => {
    req.timeStamp = new Date();
    next();
}
