const express = require('express');
const fetch = require('../fetch');

const eventRouter = () => {
    const router = express.Router();

    /* 
        Note: I've parameterized the endpoints for illustration purposes, but left it unused since we are only working with the "democon" resource
    */
    router.get('/:event', (_, res) => {
        fetch.getEvent()
            .then(response => res.json(response))
            .catch(err => {
                res.status('500').json(err);
            });
    });

    router.get('/:event/talks', (_, res) => {
        fetch.getTalks()
            .then(response => res.json(response))
            .catch(err => {
                res.status('500').json(err);
            });
    });

    return router;
}

module.exports = eventRouter;