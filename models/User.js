const {Schema, model} = require('mongoose');

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //Matching Goes Here
    },
    //thoughts:
    //friends:
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
});

userSchema.virtual('friendCount').get(function() {
    return this.firends.length;
});

const User = model('User', userSchema);

module.exports = User;