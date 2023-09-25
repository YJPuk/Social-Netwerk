const router = require('express').Router();

const {
    getUsers, 
    userById, 
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
    .get(userById)
    .delete(deleteUser)
    .put(updateUser);

// Friends of user
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router; 