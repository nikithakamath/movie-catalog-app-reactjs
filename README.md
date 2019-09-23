# movie-catalog-app-react
A movie catalog built with React.js. Here the user of the application can signup and login with email and password. Firebase Authentication service is used for authentication. This application calls REST APIs to display information.

## Getting started
Please follow the instructions to get started with this application

### Prerequisites
* Download and install [Node.js](https://nodejs.org/en/download/)
* Create [Firebase account](https://firebase.google.com/)

### Installation
* Clone this repo : git clone https://github.com/nikithakamath/movie-catalog-app-reactjs.git
* Set up Firebase
* Add API url in *.env* file
* Run ```npm install```

## Firebase set up
Please follow the steps mentioned here : https://firebase.google.com/docs/web/setup
Add the Firebase configuration keys into *.env* file

## Local deployment
To run locally, run the command ```npm start```

## Production deployment
Please follow these steps :
* Run ```npm run build``` to build the app for production to the `build` folder
* Set up for [Firebase hosting](https://firebase.google.com/docs/hosting/quickstart)
* Run ```firebase deploy``` to run the app in production
