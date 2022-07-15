// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')
const { validateProj, validatePjId } = require('./projects-middleware')
const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
        let pro = await Projects.get()
        res.send(pro)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', (req, res, next) => {
    const {id} = req.params;
    Projects.get(id)
        .then(proj => {
            res.json(proj);
        })
        .catch(next)
})

router.post('/', validateProj, (req, res, next) => {
    Projects.insert(req.pj)
        .then(yay => res.json(yay))
        .catch(next)
})

router.put('/:id', validateProj, (req, res, next) => {
    Projects.update(req.params.id, req.pj)
        .then(proj => res.json(proj))
        .catch(next)
})

router.delete('/:id', validatePjId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(() => res.send())
        .catch(next)
})

module.exports = router;