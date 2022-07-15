// add middlewares here related to projects
module.exports = {
    validateProj(req, res, next) {
        const {name, description} = req.body;
        if(!(name.trim()) || !(description.trim())) return next({message: "missing required field(s)", status: 400});
        req.pj = {name: req.body.name.trim(), description: req.body.description.trim()};
        next()
    }
}