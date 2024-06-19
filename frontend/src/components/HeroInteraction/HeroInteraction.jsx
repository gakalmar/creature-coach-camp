import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './HeroInteraction.css'
import Quest from '../Quest/Quest';
import { getHero } from '../../services/fetchHero';
import { patchAction } from '../../services/patchHero';

export default function HeroInteraction({ hero, setHero, user }) {

    const navigate = useNavigate();
    const [quests, setQuests] = useState([]);

    const handleHeroAction = async (positiveEffect, positiveValue, negativeEffect, negativeValue) => {
        const updateProps = {
            positive_effect: positiveEffect,
            positive_value: positiveValue,
            negative_effect: negativeEffect,
            negative_value: negativeValue
        }
        await patchAction(user._id, updateProps, 'action');
        setHero(await getHero(user.loggedIn, user._id));
    };

    const handleHeroQuest = async () => {
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

    useEffect(() => {
        async function test() {
            setHero(await getHero(user.loggedIn, user._id));
        }
        test();
    }, [quests]);


    let content = null;

    if (user !== null && hero !== null && quests.length > 0) {
        content = (
            <div className="quests-container">
                <Quest quests={quests} setQuests={setQuests} user={user} hero={hero} />
            </div>
        )
    } else if (user !== null && hero !== null && quests.length === 0) {
        content = (
            <div className="selected-hero-details">
                <div className='selected-hero-card'>
                    <img src={`/images/creatures/${hero.species}.png`} alt="hero-image" />
                    <h2>{hero.userinput.name} {`(${hero.userinput.gender})`}</h2>
                    <h3>{hero.species}</h3>

                    <ul className='hero-stats'>Stats:
                        <li>{hero.stats.xp} <img src="/images/stat_icons/xp_icon.png" alt="xp_icon" /></li>
                        <li>{hero.stats.current_hp} <img src="/images/stat_icons/hp_icon.png" alt="hp_icon" /></li>
                        <li>{hero.stats.mood} <img src="/images/stat_icons/mood_icon.png" alt="mood_icon" /></li>
                        <li>{hero.stats.gold} <img src="/images/stat_icons/gold_icon.png" alt="gold_icon" /></li>
                    </ul>

                    <div className='hero-actions'>
                        <button type='button' onClick={() => handleHeroQuest()}>Go On Quest</button>
                        <button type='button' onClick={() => handleHeroAction('xp', 10, 'mood', -15)}>Train</button>
                        <button type='button' onClick={() => handleHeroAction('mood', 10, undefined, undefined)}>Pet</button>
                        <button type='button' onClick={() => handleHeroAction('current_hp', 10, 'gold', -15)}>Feed</button>
                    </div>
                </div>
            </div>
        )
    } else {
        content = <h1>Loading...</h1>;
    }

    return content;

}
