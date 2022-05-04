const router = require('express').Router();

const {
    getAllUsers,
    getUserByID,
    postNewUser,
    putUpdateUser,
    deleteUser,
} = require('../../controllers/userController');


router.route('/')
    .get(getAllUsers)
    .post(postNewUser);

router.route('/:id')
    .get(getUserByID)
    .post(putUpdateUser)
    .delete(deleteUser);


module.exports = router;


