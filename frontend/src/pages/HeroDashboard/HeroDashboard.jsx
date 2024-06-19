import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroInteraction from '../../components/HeroInteraction/HeroInteraction';
import { getHero } from '../../services/fetchHero';
import './HeroDashboard.css'

export default function HeroDashboard({ user }) {

  const [hero, setHero] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saveHero = async () => {
      const hero = await getHero(user.loggedIn, user._id);
      setHero(hero);
    }
    saveHero();
  }, [])

  let content = null;
  if (!user.loggedIn) {
    content =
      <div>
        <h1>User not logged in!</h1>
      </div>
  } else if (user.loggedIn && !hero) {
    content =
      <div className="redirect-message">
        <h1>No Hero Selected!</h1>
        <button onClick={() => navigate('/selecthero')}>Select A Hero</button>
      </div>
  } else if (user.loggedIn && hero) {
    content =
      <div className='selected-hero-container'>
        <HeroInteraction hero={hero} setHero={setHero} user={user} />
      </div>
  }
  return content;
}
