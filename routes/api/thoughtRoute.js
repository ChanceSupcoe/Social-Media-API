const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    postNewThought,
    putUpdateThought,
    deleteThought,
    postNewReaction,
    deleteReaction,
    } =require('../../controllers/thoughtController');

router.route('/')
    .get(getAllThoughts)
    .post(postNewThought)

router.route('/:id')
    .get(getThoughtById)
    .put(putUpdateThought)
    .delete(deleteThought)

router.route('/:thoughtId/:reactions')
    .post(postNewReaction)

router.route('/:thoughtId/:reactionId')
    .delete(deleteReaction)


module.exports = router;
