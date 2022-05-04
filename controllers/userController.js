const {User, Thought} = require('../models');

const UserController = {

    getAllUsers(req, res) {
        User.find({})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    getUserByID({params}, res) {
        User.findOne({_id: params.id})
        .populate([
            {path: 'thoughts', select: "-__v"},
            {path: 'friends', select: "-__v"},
        ])
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'User not found'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    postNewUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    putUpdateUser({params, body}, res) {
        User.findOneAndUpdate({_id:params.id}, body, {new:true, runValidators:true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'User not found'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteUser({params}, res) {
        User.findOneAndDelete({_id:params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'User not found'});
                return;
            }
        })
        .catch(err => res.status(400).json(err));
    },

    postNewFriend({params}, res) {
        User.findOneAndUpdate(
            {_id:params.userId},
            {$addToSet: {friends: params.friendId}},
            {new:true, runValidators:true},
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'User not found'});
                return;
            }
            User.findOneAndUpdate(
                {_id:params.friendId},
                {$addToSet: {friends:params.userId}},
                {new:true, runValidators:true},
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'User not found'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
    },

    deleteFriend({params}, res) {
        User.findOneAndUpdate(
            {_id:params.userId},
            {$addToSet: {friends: params.friendId}},
            {new:true, runValidators:true},
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'User not found'});
                return;
            }
            User.findOneAndUpdate(
                {_id:params.friendId},
                {$addToSet: {friends:params.userId}},
                {new:true, runValidators:true},
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'User not found'});
                    return; 
                }
                res.json({message: 'Friend Deleted'});
            })
            .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
    },

};

module.exports = UserController;