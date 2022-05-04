const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    postNewThought,
    putUpdateThought,
    deleteThought
    } =require('../../controllers/thoughtController');

router.route('/')
    .get(getAllThoughts)
    .post(postNewThought)

router.route('/:id')
    .get(getThoughtById)
    .put(putUpdateThought)
    .delete(deleteThought)

