const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        lowercase: true
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
    }
})

userSchema.pre("save", async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User;