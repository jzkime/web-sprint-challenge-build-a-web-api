// Write your "actions" router here!
const express = require('express');
const router = express.Router();

const actMod = require('./actions-model')
const { validateActId, validateAction } = require('./actions-middlware')

router.get('/', (req, res, next) => {
    actMod.get()
        .then(acts => res.json(acts))
        .catch(next)
});

router.get('/:id', validateActId, async (req, res, next) => {
    const { id } = req.params;
    try {
        let act = await actMod.get(id);
        res.json(act);
    } catch(err) {
        next(err);
    }
});

router.post('/', validateAction, (req, res, next) => {
    console.log(req.action)
    actMod.insert(req.action)
        .then(act => res.json(act))
        .catch(next)
})

router.put('/:id', validateActId, validateAction, (req, res, next) => {
    const {id} = req.params;
    if(req.action.completed === null) return next({status: 400, message: "invalid"});
    actMod.update(id, req.action)
        .then(upd => res.json(upd))
        .catch(next)
})

module.exports = router;