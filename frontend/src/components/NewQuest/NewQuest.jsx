import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import "./NewQuest.css"

export default function NewQuest() {

    const navigate = useNavigate();

    //const [loading, setLoading] = useState(true);
    const [values, setValues] = useState({
        name: "",
        location: "",
        description: "",
        quest_duration: 0,
        image_url: "",
        reward_gold: 0,
        reward_xp: 0,
        hp_loss: 0
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    async function handleNewQuest(event) {
        event.preventDefault();
        try {
            const response = await fetch("/api/v1/newQuest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            await response.json();
            if (response.ok) {
                alert("Quest successfully added!")
            } else {
                console.error('Add new quest failed:', response.message);
            }
        } catch (error) {
            console.log("Error happened during adding new quest", error)
        }
    }

    //if (loading) return <div>Loading...</div>

    return (
        <div className="editer-container">
            <form onSubmit={handleNewQuest} className="editer-form">
                <h1>Add new quest:</h1>
                <label htmlFor="name">Quest name:</label>
                <input type="text" id="name" name="name" value={values.name} onChange={handleChange} />
                <label htmlFor="location">Location:</label>
                <input type="text" id="location" name="location" value={values.location} onChange={handleChange} />
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" value={values.description} onChange={handleChange} />
                <label htmlFor="quest_duration">Duration:</label>
                <input type="number" id="quest_duration" name="quest_duration" value={values.quest_duration} onChange={handleChange} />
                <label htmlFor="image_url">Image URL:</label>
                <input type="text" id="image_url" name="image_url" value={values.image_url} onChange={handleChange} />
                <label htmlFor="reward_gold">Reward (gold):</label>
                <input type="number" id="reward_gold" name="reward_gold" value={values.reward_gold} onChange={handleChange} />
                <label htmlFor="reward_xp">Reward (XP):</label>
                <input type="number" id="reward_xp" name="reward_xp" value={values.reward_xp} onChange={handleChange} />
                <label htmlFor="hp_loss">HP loss:</label>
                <input type="number" id="hp_loss" name="hp_loss" value={values.hp_loss} onChange={handleChange} />
                <div className="editer-button-container">
                    <button type="submit" onClick={handleNewQuest}>Submit new quest</button>
                    <button type="button" onClick={() => navigate("/edit")}>Back</button>
                </div>
            </form>
        </div>
    )
}