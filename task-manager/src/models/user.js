const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be a positive number")
            }
        }
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("email invalid")
            }
        },
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 6) {
                throw Error("Password must be higher than 6 chars")
            } else if (value.toLowerCase().includes("password")) {
                throw Error("password cannot be password")
            }
        }
    },
    avatar: {
        type: Buffer
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
}, {
    timestamps: true
})
//helps mongoose to understand the relationship between the 2 collections
userSchema.virtual('tasks', {
    ref: "Tasks",
    localField: "_id",
    foreignField: "owner"
})

//alter the sent json to all user model
userSchema.methods.toJSON = function () {
    const user = this;

    const userObject = user.toObject()
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;
}

//methods = methods available on instances
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT);
    console.log(user._id)
    console.log(token)
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

//statics = methods available on models
//create method that can be called from User model
//finds user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Unable to login")
    }

    return user;
}

//hash the plain text password before saving
userSchema.pre("save", async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
});

//delete users tasks when user is removed

userSchema.pre("remove", async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next();
})

const User = mongoose.model('User', userSchema)

module.exports = User;