import React from "react";
import './EditableQuests.css';
export function EditableQuests({ quests, handleEditQuestBtn, handleDeleteQuestBtn}) {
    
    return <div className="edit-quest-container">
        <h1>Quests:</h1>
        {quests.map(quest => <div className="quest-container" key={quest._id}>
            <h2>{quest.name.toUpperCase()}</h2>
            <p>ID: {quest._id}</p>
            <div>
                <button id={"edit"+quest._id} onClick={handleEditQuestBtn}>Edit</button>
                <button id={"delete"+quest._id} onClick={handleDeleteQuestBtn}>Delete</button>
            </div>
        </div>)}
    </div>;
}
