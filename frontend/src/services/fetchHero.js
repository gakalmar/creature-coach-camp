const getHero = async (loggedIn, _id) => {
    try {
        const res = await fetch(`/api/v1/hero/${loggedIn}/${_id}`)
        return await res.json();
    } catch (err) {
        console.error(`Error fetching hero! ${err}`);
    }
};

const getHeroQuests = async (setQuests) => {
    try {
        const res = await fetch('/api/v1/quests');
        if (res.ok) {
            setQuests(await res.json());
            console.log('Quests fetched successfully!');
        }
    } catch (err) {
        console.error(`Error fetching quests! ${err}`);
    }
};

export { getHero, getHeroQuests };