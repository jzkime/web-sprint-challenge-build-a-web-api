// add middlewares here related to actions
const actMod = require('./actions-model')
module.exports = {
    async validateActId(req, res, next) {
        const {id} = req.params;
        let act = await actMod.get(id);
        if(!act) return next({status: 404, message: "no action with that id!"})
        next()
    },
    validateAction(req, res, next) {
        const { description, notes } = req.body;
        if(!description || !notes) return next({status: 400, message: "invalid"})
        next()
    }
}