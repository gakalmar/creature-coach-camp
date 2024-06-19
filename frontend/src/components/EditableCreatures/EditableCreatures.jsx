import React from "react";
import './EditableCreatures.css';
export function EditableCreatures({ creatures, handleEditCreatureBtn, handleDeleteCreatureBtn }) {
    
    return <div className="edit-creature-container">
        <h1>Creatures:</h1>
        {creatures.map(creature => <div className="creature-container" key={creature._id}>
            <h2>{creature.species.toUpperCase()}</h2>
            <p>ID: {creature._id}</p>
            <div>
                <button id={"edit"+creature._id} onClick={handleEditCreatureBtn}>Edit</button>
                <button id={"delete"+creature._id} onClick={handleDeleteCreatureBtn}>Delete</button>
            </div>
        </div>)}
    </div>;
}
