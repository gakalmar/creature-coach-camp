import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectHero.css';
import HeroDetails from '../../components/HeroDetails/HeroDetails';
import getCreatures from '../../services/fetchCreatures';
import getUser from '../../services/getUser';

export default function SelectHero({ user }) {
  console.log(user);
  const navigate = useNavigate();

  const [creatures, setCreatures] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    async function useEffectHandler() {
      setCreatures(await getCreatures());
      if (user && user.loggedIn) {
        setActiveUser(await getUser(user._id));
      }
    }
    useEffectHandler();
  }, []);

  const handleSelectHero = async (e) => {

    e.preventDefault();
    const messageBody = {
      loggedIn: user.loggedIn,
      _id: user._id,
      userinput: {
        name: e.target.heroName.value,
        gender: e.target.heroGender.value
      },
      creature: selectedHero
    }

    try {
      const res = await fetch('/api/v1/hero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageBody)
      })
      if (res.ok || selectedHero) {
        alert(`You selected ${e.target.heroName.value} as your hero!`)
        navigate('/herodashboard');
      }
    } catch (err) {
      console.error(`Error saving selected hero! ${err}`);
    }
  };

  let content = null;
  if (!user.loggedIn) {
    content =
      <div>
        <h1>User not logged in!</h1>
      </div>
  } else if (!activeUser) {
    <div>
      <h1>Loading</h1>
    </div>
  } else if (selectedHero === null && !activeUser.creature) {
    content =
      <div>
        <h1>Select A Hero!</h1>

        <div className='heroes-container'>
          {creatures.map(creature => <HeroDetails key={creature.species} creature={creature} setSelectedHero={setSelectedHero} />)}
        </div>
      </div>
  } else if (selectedHero !== null && !activeUser.creature) {
    content =
      <div className='hero-selection'>
        <HeroDetails creature={selectedHero} />
        <div className='hero-form-container'>
          <form action="submit" onSubmit={(e) => handleSelectHero(e)}>
            <label htmlFor="heroName">
              Name:
              <input type="text" id='heroName' name='heroName' required={true} />
            </label>
            <label htmlFor="heroGender">
              Gender:
              <select name="heroGender" id="heroGender">
                <option value="Male" name="herGender">Male</option>
                <option value="Female" name="heroGender">Female</option>
              </select>
            </label>
            <div className='form-button-container'>
              <button type='submit'>Select Hero</button>
              <button type='button' onClick={() => setSelectedHero(null)}>Back</button>
            </div>
          </form>
        </div>
      </div>
  } else if (activeUser.creature) {
    content =
      <div className='redirect-message'>
        <h1>You already have a hero!</h1>
        <button onClick={() => navigate('/herodashboard')}>Go To Dashboard</button>
      </div>
  }
  return <>{content}</>
}
