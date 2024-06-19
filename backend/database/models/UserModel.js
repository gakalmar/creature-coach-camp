import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import validator from "validator";

const userSchema = new Schema({
    user_name: { type: String, required: true, unique: true },
    hashed_password: { type: String, required: true },
    is_admin: { type: Boolean, default: false },
    is_premium: { type: Boolean, default: false },
    creature: {
        type: {
            species: { type: String, required: true },
            image: { type: String, required: false },
            home_location: { type: String, required: true },
            userinput: {
                name: { type: String, required: true },
                gender: { type: String, required: true }
            },
            stats: {
                level: { type: Number, required: true },
                xp: { type: Number, required: true },
                current_hp: { type: Number, required: true, max: 100 },
                max_hp: { type: Number, required: true },
                gold: { type: Number, required: true },
                mood: { type: Number, required: true }
            },
            items: []
        },
        required: false
    }
});

// Static methods

userSchema.statics.signup = async function (user_name, password) {

    if (!user_name || !password) {
        throw Error("All fields must be filled")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    }

    const exists = await this.findOne({ user_name })
    if (exists) {
        throw Error("Username is already in use")
    }

    const salt = bcrypt.genSaltSync(10)
    const hashed_password = bcrypt.hashSync(password, salt);

    const user = this.create({ user_name, hashed_password })
    return user
}

userSchema.statics.login = async function (user_name, password) {
    
    if (!user_name || !password) {
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({ user_name })

    if (!user) {
        throw Error("Invalid user name")
    }

    const match = bcrypt.compareSync(password, user.hashed_password)

    if (!match) {
        throw Error("Invalid login details")
    }

    const token = { loggedIn: true, admin: user.is_admin, _id: user._id, user_name: user.user_name }
    return token;
}


export default mongoose.model('user', userSchema, 'users');