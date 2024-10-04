
const logger = (req, res, next) => {
    console.log(`Log: ${req.method} request on '${req.url}'`);
    next();
}

module.exports = logger