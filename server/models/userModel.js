import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your name"],
        trim: true,
        maxLength: [20, "Your name is up to 20 chars long."]
    },
    account: {
        type: String,
        required: [true, "Please add your email or phone"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add your password"],
    },
    avatar: {
        type: String,
        default: 'add https link to png here'
    },
    role: {
        type: String,
        default: 'user' // admin
    },
    type: {
        type: String,
        default: 'register' // login
    }
}, {
    timestamps: true
})

const UserSchema = mongoose.model('User', userSchema);

export default UserSchema;