const router = require('express').Router();
const {getUsers, getUserID, createUser, updateUser, deleteUser, addFriends, deleteFriend} = require('../../controllers/users');

//GET AND CREATE USERS
router.route('/users').get(getUsers).post(createUser)

//GET, DELETE, AND UPDATE USERS BY ID

router.route('/users/:id').get(getUserID).delete(deleteUser).put(updateUser)

// POST AND DELETE FRIENDS BY ID
router.route('/users/:userId/friends/:friendId').post(addFriends).delete(deleteFriend)


module.exports = router; 