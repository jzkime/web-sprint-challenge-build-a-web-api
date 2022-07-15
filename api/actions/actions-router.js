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



module.exports = router;