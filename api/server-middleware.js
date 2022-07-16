module.exports = {
    validateCompleted(req, res, next) {
        const {completed} = req.body;
        if(completed === null) return next({status: 400, message: "invalid completed info"});
        next()
    }
}