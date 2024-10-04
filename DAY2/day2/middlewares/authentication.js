
const isAuthenticated = (req, res, next) => {
    const auth = req.headers.authorization;

    if (auth && auth === "user") {
        next();
    }

    res.status(401);
    res.send("User is not authenticated !");
}

module.exports = {
    isAuthenticated
}