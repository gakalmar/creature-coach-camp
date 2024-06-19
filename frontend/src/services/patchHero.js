async function patchAction(_id, updateProperties) {
    try {
        const res = await fetch(`/api/v1/heroAction`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id, updateProperties })
        })

        if (!res.ok) {
            console.log(`Ooops, something went wrong during updating`)
            return
        } else if (res.status === 202) {
            const response = await res.json();
            alert(response.message)
            return
        }
        console.log(`Update succesful!`);
        const { positive_effect, positive_value, negative_effect, negative_value } = updateProperties

        if (!negative_value && !negative_effect) {
            alert(`Success! \nYou gained ${positive_value} ${positive_effect}!`);
        } else {
            alert(`Success! \nYou gained ${positive_value} ${positive_effect}, but lost ${negative_value} ${negative_effect}!`);
        }

        return await res.json()

    } catch (err) {
        console.error(`Error updating hero stats! ${err}`);
    }
}

async function patchQuest(_id, updateProperties) {
    try {
        const res = await fetch(`/api/v1/questAction`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id, updateProperties })
        })

        if (!res.ok) {
            console.log(`Ooops, something went wrong during updating`)
            return
        }

        console.log(`Update succesful!`);

        const { quest_positive_value_one, quest_positive_value_two, quest_negative_value } = updateProperties
        alert(`Quest successful! Your creature gained ${quest_positive_value_one} Gold, ${quest_positive_value_two} XP and lost ${quest_negative_value} HP`)

        return await res.json()

    } catch (err) {
        console.error(`Error updating hero stats! ${err}`);
    }
}

export { patchAction, patchQuest }