const router = require('express').Router();

const {
    getAllUsers,
    getUserByID,
    postNewUser,
    putUpdateUser,
    deleteUser,
    postNewFriend,
    deleteFriend,
} = require('../../controllers/userController');


router.route('/')
    .get(getAllUsers)
    .post(postNewUser);

router.route('/:id')
    .get(getUserByID)
    .post(putUpdateUser)
    .delete(deleteUser);

router.route('/:id/friends/:friendId')
    .post(postNewFriend)
    .delete(deleteFriend)


module.exports = router;


