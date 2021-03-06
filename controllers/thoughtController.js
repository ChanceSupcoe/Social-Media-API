const {User, Thought} = require('../models');

const ThoughtController = {

    getAllThoughts(req, res) {
        Thought.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    getThoughtById({params}, res) {
        Thought.findOne({_id:params.id})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'Thought not found'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    postNewThought({params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: _id}},
                {new: true}
            )
            .then (dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'User not found'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
    },

    putUpdateThought({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id:params.id},
            body,
            {new: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'Thought not found'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id:params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'Thought not found'});
                return;
            }
            User.findOneAndUpdate(
                {username: dbThoughtData.username},
                {$pull: {thoughts: params.id}}
            )
            .then(() => {
                res.json({message: 'Thought Deleted'});
            })
            .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
    },

    postNewReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id:params.thoughtId},
            {$addToSet: {reactions: body}},
            {new:true, runValidators:true},
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'Thought not found'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(500).json(err));
    },

    deleteReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id:params.thoughtId},
            {$pull: {reactions: {reactionId:body.reactionId}}},
            {new:true, runValidators:true},
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'Thought not found'});
                return;
            }
            res.json({message: 'Reaction Deleted'});
        })
        .catch(err => res.status(500).json(err));
    },
    
};

module.exports = ThoughtController;