const router = require('express').Router();
const {getAllUsers} = require('../../controllers/users');

// User route
router.route('/users').get(getAllUsers)


module.exports = router; 