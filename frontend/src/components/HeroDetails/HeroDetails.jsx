import React from 'react';
import './HeroDetails.css';

export default function HeroDetails({ creature, setSelectedHero }) {
    return (
        <div className='hero-cards'>
            <div className='hero-card' onClick={() => setSelectedHero(creature)}>
                <img src={`/images/creatures/${creature.species}.png`} alt="hero-image" />
                <h2>{creature.species}</h2>
                <h3>{creature.home_location}</h3>

                <ul className='hero-stats'>Stats:
                    <li>{creature.stats.current_hp} <img src="/images/stat_icons/hp_icon.png" alt="hp_icon" /></li>
                    <li>{creature.stats.gold} <img src="/images/stat_icons/gold_icon.png" alt="gold_icon" /></li>
                    <li>{creature.stats.mood} <img src="/images/stat_icons/mood_icon.png" alt="mood_icon" /></li>
                </ul>
            </div>
        </div>
    )
}
