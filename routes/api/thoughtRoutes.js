const router = require('express').Router();
const {getThoughts, getThoughtById, newThought, updateThought, deleteThought, newReaction, deleteReaction} = require('../../controllers/thought') 

// GET ALL THOUGHTS AND POST A NEW THOUGHT
router.route('/thoughts').get(getThoughts).post(newThought)

// GET, DELTE AND UPDATE THOUGHTS BY ID
router.route('/thoughts/:id').get(getThoughtById).delete(deleteThought).put(updateThought)

// POST AND DELETE A REACTION
router.route('/thoughts/:thoughtId/reactions').post(newReaction).delete(deleteReaction)

// DELETE A REACTION
router.route('/thoughts/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router; 