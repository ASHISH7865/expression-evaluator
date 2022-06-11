<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better, please fork the repo and create a pull request or simply open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
     <img src="https://img.icons8.com/cute-clipart/64/undefined/apple-calculator.png" alt='logo'/>
  </a>

<h3 align="center">SImple Calculator ( expression evaluator )</h3>

  <p align="center">
    An App that evaluates simple mathematical expressions.
    <br />
    <br />
      <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
  </p>


<!-- TABLE OF CONTENTS -->

## Table of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
    


<!-- ABOUT THE PROJECT -->

## About The Project

This simple calculator is a simple, easy to use calculator that evaluates simple mathematical expressions.
with login and registration functionality and many features listed below.
  
* I have used React for the frontend and Firebase for the backend.
* FireStore is a cloud database that I used to store the users and their data.
* Redux for the state management.

### Features of Calculator: 

    * Evaluates simple mathematical expressions
    * Supports addition, subtraction, multiplication, division
    * Supports parentheses
    * Supports negative numbers

### Features of Authentication:
    * Login and Registration with email and password
    * User can also login with Google account.
    * Only authorized users can access the calculator.
    * User can update their profile information except email
    * User can logout

### Features of FireStore (Firebase) Database:
    * User can save their expressions and results in a database
    * User can view their saved expressions and results
    * User information is stored in a database


### Built With

T This project was built with the following technologies:
* [React](https://reactjs.org/)
* [sass](https://sass-lang.com/)
* [React-Redux](https://react-redux.js.org/)
* [Firebase](https://firebase.google.com/)
* [Firebase Auth](https://firebase.google.com/docs/auth/)
* [Firebase Firestore](https://firebase.google.com/docs/firestore/)


<!-- GETTING STARTED -->

## Getting Started
  Clone the repository from [GitHub / expression-evaluator](https://github.com/ASHISH7865/expression-evaluator.git)
  open the project in your favorite IDE.
  open ide terminal and run the following command:
  ```sh
cd expression-evaluator
```
  Then, follow the steps below to get started.
    
  



* To install dependencies, run the following command:

```sh
npm install 
```

* To set your Firebase Configuration, follow the steps below:
* Go to the Firebase Console and create a new project.
* Go to the Firebase Console and select the project you created.
* and copy the configuration from the Firebase Console.
* your configuration should look like this:
```sh
const firebaseConfig = {
apiKey: Your API Key,
authDomain: Your Auth Domain,
projectId: Your Project ID,
storageBucket: Your Storage Bucket,
messagingSenderId: Your Messaging Sender ID,
appId:  Your App ID,
};
````
* Paste the configuration inside the `src/util/Firebase.utils.js` firebase in the root directory of the project.
<br/>
<br/>
* Run the following command to start the project:
```sh
npm start
```
Now create User Account and Login to the calculator.