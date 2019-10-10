# Nodejs, Express server connected to MySQL
This is a simple webserver by group C1 in the course Cross Disciplinary Teamwork (fall 2020) at the IT University of Copenhagen

## Requirements
Node and NPM

## To run
- `git clone <this_repo>`
- create a file in root called `.env` which stores your database credentials. See the file `.env.config` for a list of the needed variables
- Navigate to the folder and run `npm install`
- Run `npm start`
- Open your browser and go to `localhost:3000` - You should get a message saying `I am root` in your browser
- Open `localhost:3000/arduino` to check if there's a connection to your database. 
- If anything fails check your terminal to find the error. Most likely it's your database credentials stored in .env. 
