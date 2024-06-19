import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import path from "path";

import Creature from './database/models/CreatureModel.js'
import Hero from './database/models/HeroModel.js'
import Quests from './database/models/QuestModel.js'
import UserModel from "./database/models/UserModel.js";


// Construct directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config files
dotenv.config({
    path: path.join(__dirname, './config/.env'),
    override: true,
});
const dbUrl = process.env.DB_URL;

// Create app  express instance
const app = express();

// Middlewares
app.use(express.json())
app.use(express.static('public'))

app.use((req, _, next) => {
    console.log(`Request method: ${req.method}`);
    console.log(`Request url: ${req.url}`);
    next()
})


// Endpoints
app.get('/api/v1/welcome', (req, res) => {
    try {
        res.status(200).json({ message: "Hello world" })
    } catch (error) {
        return res.status(500).json({ message: "Some error occured" })
    }
})

app.get('/api/v1/creatures', async (req, res) => {
    try {
        const creatures = await Creature.find({})

        if (!creatures) {
            res.status(404).json({ message: "Not found in database" })
        }

        console.log(`Response sent!`);
        return res.status(200).json(creatures)

    } catch (error) {
        console.log(`Some error occured: ${error}`);
        return res.status(500).json({ message: "Some error occured" })
    }
})

app.get('/api/v1/creature/:id', async (req, res) => {
    try {
        const creature = await Creature.findById(req.params.id)

        if (!creature) {
            res.status(404).json({ message: "Not found in database" })
        }

        console.log(`Response sent!`);
        return res.status(200).json(creature)

    } catch (error) {
        console.log(`Some error occured: ${error}`);
        return res.status(500).json({ message: "Some error occured" })
    }
})


app.get('/api/v1/quests', async (req, res) => {
    try {
        const quests = await Quests.find({})

        if (!quests) {
            res.status(404).json({ message: "Not found in database" })
        }

        console.log(`Response sent!`);
        return res.status(200).json(quests)

    } catch (error) {
        console.log(`Some error occured: ${error}`);
        return res.status(500).json({ message: "Some error occured" })
    }
})

app.get('/api/v1/quests/:id', async (req, res) => {
    try {
        const quest = await Quests.findById(req.params.id)

        if (!quest) {
            res.status(404).json({ message: "Not found in database" })
        }

        console.log(`Response sent!`);
        return res.status(200).json(quest)

    } catch (error) {
        console.log(`Some error occured: ${error}`);
        return res.status(500).json({ message: "Some error occured" })
    }
})


app.get('/api/v1/hero/:loggedIn/:_id', async (req, res) => {

    try {
        const { loggedIn, _id } = req.params
        if (loggedIn === "true") {
            const user = await UserModel.findOne({ _id: _id })
            const hero = user.creature
            if (!hero) {
                return res.status(404).json({ hero: null, message: "Not found in database" })
            }

            console.log(`Response sent!`);
            return res.status(200).json(hero)
        }

    } catch (error) {
        console.log(`Some error occured: ${error}`);
        return res.status(500).json({ message: "Some error occured" })
    }
})

app.post('/api/v1/hero', async (req, res) => {

    try {

        const { loggedIn, _id, userinput, creature } = req.body

        if (!loggedIn) {
            return res.status(401).json({ message: "User not logged in" })
        }

        const user = await UserModel.findOne({ _id: _id })
        const hero = user.creature

        if (hero) {
            return res.status(422).json({ message: "You have alredy chosen a hero" })
        }

        console.log("logolva:" + creature);
        const newHero = {
            species: creature.species,
            image: creature.image,
            home_location: creature.home_location,
            userinput: {
                name: userinput.name,
                gender: userinput.gender
            },
            stats: {
                level: 1,
                xp: 0,
                current_hp: 100,
                max_hp: 100,
                gold: 0,
                mood: 50
            },
            items: []
        }

        user.creature = { ...newHero }
        const savedUser = await user.save()
        return res.status(201).json(savedUser)

    } catch (error) {
        console.log(`Some error occured: ${error}`);
        return res.status(500).json({ message: "Some error occured" })
    }
})

app.patch('/api/v1/heroAction/', async (req, res) => {
    try {
        //Extract data from the request
        const { _id, updateProperties } = req.body
        const { positive_effect, positive_value, negative_effect, negative_value } = updateProperties

        // Validation for stats
        if (positive_effect === "gold" ||
            positive_effect === "mood" ||
            positive_effect === "current_hp" ||
            positive_effect === "xp" ||
            negative_effect === 'gold' ||
            negative_effect === "mood" ||
            negative_effect === "current_hp" ||
            negative_effect === "xp") {

            // Extract data from the database
            const user = await UserModel.findById(_id)
            const hero = user.creature
            const maxHP = hero.stats.max_hp
            const currentHP = hero.stats.current_hp
            const mood = hero.stats.mood
            const gold = hero.stats.gold

            let positiveUpdate = hero.stats[positive_effect] + positive_value
            let negativeUpdate = hero.stats[negative_effect] + negative_value

            // Validation before updates
            if ((positiveUpdate > maxHP) && positive_effect === "current_hp") positiveUpdate = 100;
            if (negative_effect === 'mood' && mood < Math.abs(negative_value)) return res.status(202).json({ message: `Not enough mood to train :(` });
            if (negative_effect === 'gold' && gold < Math.abs(negative_value)) return res.status(202).json({ message: `Not enough gold to buy food! \nSad ${hero.species} noises :(` });

            // Modify and save data on the database
            hero.stats[positive_effect] = positiveUpdate
            hero.stats[negative_effect] = negativeUpdate
            await user.save()

            // Backend log messages (might use some logger program later)
            console.log(`Response sent!\nAltered Hero:\n${hero}`);

            // Response send on success
            return res.status(200).json({
                message: (currentHP === 100 && positive_effect === "current_hp") ?
                    "Your hero is at full hp" :
                    "Success"
            })
        }
        // Response send on validation error and backend logs
        console.log(`Bad request!\nError: Validation failed, ${positive_effect} or ${negative_effect} is not an existing stat`);
        return res.status(400).json({ message: "Bad request" })

    } catch (error) {
        // Response send on any other error and backend logs
        console.log(error);
        return res.status(500).json({ message: "Some error occured" })
    }
})

app.patch('/api/v1/questAction/', async (req, res) => {
    try {
        //Extract data from the request
        const { _id, updateProperties } = req.body
        const { quest_positive_effect_one, quest_positive_value_one, quest_positive_effect_two, quest_positive_value_two, quest_negative_effect, quest_negative_value } = updateProperties

        // Validation for stats
        if (quest_positive_effect_one === "gold" &&
            quest_positive_effect_two === "xp" &&
            quest_negative_effect === "current_hp") {

            // Extract data from the database
            const user = await UserModel.findById(_id)
            const hero = user.creature

            let goldUpdate = hero.stats[quest_positive_effect_one] + quest_positive_value_one;
            let xpUpdate = hero.stats[quest_positive_effect_two] + quest_positive_value_two;
            let hpUpdate = hero.stats[quest_negative_effect] + quest_negative_value;

            // Modify and save data on the database
            hero.stats[quest_positive_effect_one] = goldUpdate
            hero.stats[quest_positive_effect_two] = xpUpdate
            hero.stats[quest_negative_effect] = hpUpdate
            await user.save()

            // Backend log messages (might use some logger program later)
            console.log(`Response sent!\nAltered Hero:\n${hero}`);

            // Response send on success
            return res.status(200).json({ message: "Success" });
        }
        // Response send on validation error and backend logs
        console.log(`Bad request!`);
        return res.status(400).json({ message: "Bad request" })

    } catch (error) {
        // Response send on any other error and backend logs
        console.log(error);
        return res.status(500).json({ message: "Some error occured" })
    }
})

app.patch(`/api/v1/updateCreature/:id`, async (req, res) => {
    try {
        const creatureId = req.params.id;
        const creature = await Creature.findOne({ _id: creatureId });

        if (!creature) {
            res.status(404).json({ message: "Not found in database" })
        }

        creature.species = req.body.species,
        creature.image = req.body.image,
        creature.home_location = req.body.home_location,
        creature.stats = req.body.stats

        await creature.save();
        res.json({ message: "Update successful!", creature })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update creature!" });
    }
})

//Timi
app.post(`/api/v1/newCreature`, async (req, res) => {
    try {
        const newCreature = new Creature({    
            species: req.body.species,
            image: req.body.image,
            home_location: req.body.home_location,
            stats: req.body.stats
        })

        await newCreature.save();
        res.json({ message: "New creature added to the database", newCreature })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to added a new creature!" });
    }
})

app.delete(`/api/v1/deletecreature/:id`, async (req, res) => {
    try {
        await Creature.deleteOne({ _id: req.params.id });
        res.json({ message: "Item successfully deleted!" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update creature!" });
    }
})

app.delete(`/api/v1/deletequest/:id`, async (req, res) => {
    try {
        await Quests.deleteOne({ _id: req.params.id });
        res.json({ message: "Item successfully deleted!" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update creature!" });
    }
})

app.patch(`/api/v1/updateQuest/:id`, async (req, res) => {
    try {
        const questId = req.params.id;
        const quest = await Quests.findOne({ _id: questId });

        if (!quest) {
            res.status(404).json({ message: "Not found in database" })
        }

        quest.name = req.body.name,
            quest.location = req.body.location,
            quest.description = req.body.description,
            quest.quest_duration = req.body.quest_duration,
            quest.image_url = req.body.image_url,
            quest.reward_gold = req.body.reward_gold,
            quest.reward_xp = req.body.reward_xp,
            quest.hp_loss = req.body.hp_loss

        await quest.save();
        res.json({ message: "Update successful!", quest })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update creature!" });
    }
})

//Timi
app.post(`/api/v1/newQuest`, async (req, res) => {
    try {
        const newQuest = new Quests({
            name: req.body.name,
            location: req.body.location,
            description: req.body.description,
            quest_duration: req.body.quest_duration,
            image_url: req.body.image_url,
            reward_gold: req.body.reward_gold,
            reward_xp: req.body.reward_xp,
            hp_loss: req.body.hp_loss
        })
        await newQuest.save();
        res.json({ message: "New quest added to the database!", newQuest })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to added a new quest!" });
    }
})

app.post('/api/v1/registerUser', async (req, res) => {
    try {
        const { user_name, user_password } = req.body;

        const newUser = await UserModel.signup(user_name, user_password)
        console.log(newUser);
        return res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message })
    }
})

app.post("/api/v1/loginUser", async (req, res) => {
    try {
        const { user_name, user_password } = req.body;
        const token = await UserModel.login(user_name, user_password)
        return res.status(200).json(token)
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message })
    }
})
app.get("/api/v1/user/:_id", async (req, res) => {
    try {
        const { _id } = req.params
        const user = await UserModel.findById(_id)

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({ message: "Some error occured" })

    }
})

// Main
async function main() {
    await mongoose.connect(dbUrl)
    app.listen(3000, () => {
        console.log("server is running at port: 3000");
    })
}
main()
