import { EditableQuests } from '../../components/EditableQuests/EditableQuests.jsx';
import { EditableCreatures } from '../../components/EditableCreatures/EditableCreatures.jsx';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Edit.css";

export default function Edit() {

    const navigate = useNavigate();

    const [creatures, setCreatures] = useState([]);
    const [quests, setQuests] = useState([]);

    useEffect(() => {
        const fetchCreatures = async () => {
            try {
                const response = await fetch("/api/v1/creatures");
                const creatures = await response.json();
                setCreatures(creatures);
            } catch (error) {
                console.error("Failed to fetch creatures!", error)
            }
        };
        const fetchQuests = async () => {
            try {
                const response = await fetch("/api/v1/quests");
                const quests = await response.json();
                setQuests(quests);
            } catch (error) {
                console.error("Failed to fetch quests!", error)
            }
        };
        fetchCreatures();
        fetchQuests();
    }, [])

    function handleEditCreatureBtn(event) {
        const creatureId = event.target.id;
        navigate(`/editcreature/${creatureId.slice(4)}`);
    }

    function handleEditQuestBtn(event) {
        const questId = event.target.id;
        navigate(`/editquest/${questId.slice(4)}`);
    }

    function handleNewCreatureBtn(event) {
        navigate("/newcreature");
    }

    function handleNewQuestBtn(event) {
        navigate("/newquest");
    }


    async function handleDeleteCreatureBtn(event) {
        const creatureId = event.target.id.slice(6);
        const isConfirmed = window.confirm("Are you sure you want to delete this creature?");
        if (isConfirmed) {
            try {
                const response = await fetch(`/api/v1/deletecreature/${creatureId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                await response.json();
                if (response.ok) {
                    alert("Item deleted successfully!");
                    window.location.reload();
                } else {
                    console.log("Item couldn't be deleted!")
                }
            } catch (error) {
                console.log("An error occurred while fetching", error)
            }
        } else {
            console.log("Deletion cancelled.");
        }
    }

    async function handleDeleteQuestBtn(event) {
        const questId = event.target.id.slice(6);
        const isConfirmed = window.confirm("Are you sure you want to delete this quest?");
        if (isConfirmed) {
            try {
                const response = await fetch(`/api/v1/deletequest/${questId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                await response.json();
                if (response.ok) {
                    alert("Item deleted successfully!");
                    window.location.reload();
                } else {
                    console.log("Item couldn't be deleted!")
                }
            } catch (error) {
                console.log("An error occurred while fetching", error)
            }
        } else {
            console.log("Deletion cancelled.");
        }
    }

    if (!creatures || !quests) { return <>Loading...</> }
    return (
        <div className='edit-container'>
            <button className='create-btn' onClick={handleNewCreatureBtn}>Add new creature</button>
            <button className='create-btn' onClick={handleNewQuestBtn}>Add new quest</button>
            <EditableCreatures creatures={creatures} handleEditCreatureBtn={handleEditCreatureBtn} handleDeleteCreatureBtn={handleDeleteCreatureBtn} />
            <EditableQuests quests={quests} handleEditQuestBtn={handleEditQuestBtn} handleDeleteQuestBtn={handleDeleteQuestBtn} />
        </div>
    );
}