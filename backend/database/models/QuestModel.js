import mongoose from "mongoose";

const questSchema = mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    quest_duration: { type: Number, required: true },
    // New properties:
    image_url: { type: String, required: false },
    reward_gold: { type: Number, required: true },
    reward_xp: { type: Number, required: true },
    hp_loss: { type: Number, required: true },
})

export default mongoose.model('quest', questSchema, 'quests')