import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import "./EditQuest.css"
export default function EditQuest() {

    const { questId } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        const setInitialValues = async () => {
            try {
                const response = await fetch(`/api/v1/quests/${questId}`);
                const selectedQuest = await response.json();
                setValues({
                    name: selectedQuest.name,
                    location: selectedQuest.location,
                    description: selectedQuest.description,
                    quest_duration: selectedQuest.quest_duration,
                    image_url: selectedQuest.image_url,
                    reward_gold: selectedQuest.reward_gold,
                    reward_xp: selectedQuest.reward_xp,
                    hp_loss: selectedQuest.hp_loss
                })
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch single quest!", error);
            }
        }
        setInitialValues();
    }, [questId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    async function handleEditQuest(e) {
        e.preventDefault();
        try {
            const response = await fetch(`/api/v1/updateQuest/${questId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            await response.json();
            if (response.ok) {
                alert("Quest successfully updated!")
            } else {
                console.error('Update failed:', response.message);
            }
        } catch (error) {
            console.log("Error happened during update", error)
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div className="editer-container">
            <form onSubmit={handleEditQuest} className="editer-form">
                <h1>Edit quest:</h1>
                <p>ID: {questId}</p>
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
                    <button type="submit">Confirm changes</button>
                    <button type="button" onClick={() => navigate("/edit")}>Back</button>
                </div>
            </form>
        </div>
    )
}