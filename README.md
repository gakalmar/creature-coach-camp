# Creature Coach Camp

### Description 
- A gaming app, that lets you create a mythical creature and raise it by different interaction methods:
- Interaction types:
    - **Send on quest** makes your creature gain `gold`, but reduces `mood`
    - **Training** makes your creature gain `XP` but reduce `HP`
    - **Pet** makes your creature gain `mood`
    - **Feed** makes your creature gain `HP`

### Background
- The app was created to showcase the MERN full-stack methods learned at Codecool:
    - **Database:** MongoDB (store user and creature data)
    - **Backend:** Express
    - **Frontend:** React
    - **Runtime:** Node.js

### Start the app
- Start locally:
    - In the backend folder: `npm start`
    - In the frontend folder: `npm run dev`

- Use containerized version:
    - Create `.env` file in `./backend/config` folder to store your database connection string:
        - `DB_URL = '<YOUR_CONNECTION_STRING>'`
    - Run `docker-compose up`
