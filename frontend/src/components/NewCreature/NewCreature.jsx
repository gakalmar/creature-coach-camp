import { useNavigate } from "react-router-dom"
import { useState } from "react";
import "./NewCreature.css"

export default function NewCreature() {

    const navigate = useNavigate();

    //const [loading, setLoading] = useState(true);
    const [values, setValues] = useState({
        species: "",
        image: "",
        home_location: "",
        stats: {
            level: 0,
            xp: 0,
            current_hp: 0,
            max_hp: 0,
            gold: 0,
            mood: 0
        }
    });

    const handleChange = (event) => {
        const { name, value, dataset } = event.target;
        const category = dataset.category;

        if (category) {
            setValues(prevValues => ({
                ...prevValues,
                [category]: {
                    ...prevValues[category],
                    [name]: value
                }
            }));
        } else {
            setValues(prevValues => ({
                ...prevValues,
                [name]: value
            }))
        }
    };

    async function handleNewCreature(event) {
        event.preventDefault();
        try {
            const response = await fetch("/api/v1/newCreature", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            await response.json();
            if (response.status === 200) {
                alert("New creature successfully added!")
            } else {
                console.error('Add new creature failed:', response.message);
            }
        } catch (error) {
            console.log("Error happened during adding new creature", error)
        }
    }

    //if (loading) return <div>Loading...</div>

    return (
        <div className="editer-container">
            <form onSubmit={handleNewCreature} className="editer-form">
                <h1>Add new creature:</h1>
                <label htmlFor="species">Species:</label>
                <input name="species" value={values.species} onChange={handleChange} />
                <label htmlFor="image">Image:</label>
                <input name="image" value={values.image} onChange={handleChange} />
                <label htmlFor="home_location">Home location:</label>
                <input name="home_location" value={values.home_location} onChange={handleChange} />
                <label htmlFor="level">Level:</label>
                <input name="level" type="number" value={values.stats.level} data-category="stats" onChange={handleChange} />
                <label htmlFor="xp">XP:</label>
                <input name="xp" type="number" value={values.stats.xp} data-category="stats" onChange={handleChange} />
                <label htmlFor="current_hp">Current HP:</label>
                <input name="current_hp" type="number" value={values.stats.current_hp} data-category="stats" onChange={handleChange} />
                <label htmlFor="max_hp">Max HP:</label>
                <input name="max_hp" type="number" value={values.stats.max_hp} data-category="stats" onChange={handleChange} />
                <label htmlFor="gold">Gold:</label>
                <input name="gold" type="number" value={values.stats.gold} data-category="stats" onChange={handleChange} />
                <label htmlFor="mood">Mood:</label>
                <input name="mood" type="number" value={values.stats.mood} data-category="stats" onChange={handleChange} />
                <div className="editer-button-container">
                    <button type="submit" onClick={handleNewCreature}>Submit new creature</button>
                    <button type="button" onClick={() => navigate("/edit")}>Back</button>
                </div>
            </form>
        </div>
    )
}