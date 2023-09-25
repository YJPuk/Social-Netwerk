const router = require('express').Router();

const {
    getThoughts,
    getSingleThought, 
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

//All thought routes
router
    .route('/')
    .get(getThoughts)
    .post(createThought);

//Thought route by id
router
    .route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// All reaction routes by thought ID
router
    .route('/:thoughtId/reactions')
    .post(createReaction)

// Reaction route for specific reaction via thought
router 
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;