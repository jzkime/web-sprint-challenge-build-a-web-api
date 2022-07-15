// add middlewares here related to projects
const ProjMod = require('./projects-model')
module.exports = {
    validateProj(req, res, next) {
        const {name, description} = req.body;
        if(!(name.trim()) || !(description.trim())) return next({message: "missing required field(s)", status: 400});
        req.pj = {name: req.body.name.trim(), description: req.body.description.trim()};
        next()
    },

    async validatePjId(req, res, next) {
        const { id } = req.params;
        let proj = await ProjMod.get(id);
        if(!proj) return next({status: 404, message: "no project with that id"});
        req.project = proj
        next()
    }
}