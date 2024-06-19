import mongoose from "mongoose";

const heroSchema = mongoose.Schema({
    userinput: {
        name: { type: String, required: true },
        gender: { type: String, required: true }
    },
    creature: {
        species: { type: String, required: true },
        image: { type: String, required: false },
        home_location: { type: String, required: true }
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
})

export default mongoose.model('hero', heroSchema, 'hero')