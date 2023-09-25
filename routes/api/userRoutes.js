const router = require('express').Router();

const {
    getUsers, 
    getSingleUser, 
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// All users
router
    .route('/')
    .get(getUsers)
    .post(createUser);

// User by id
router
    .route('/:id')
    .get(getSingleUser)
    .delete(deleteUser)
    .put(updateUser);

// Friends of user
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router; 