# APSIS Assignment

Hello Andres, 
After we spoke last time i decided to use NGRX as  way to manage the state of app.
I got plenty of inspiration from our friend Motto, especially regarding the testing of the of effects,reducer and actions, and overall the best practice suggested in his articles.Hope i got the whole points right.

As per the game logic per se (located in app.ts), is basically a reduce operation.


I didn t really had much time to dedicate to embellish, i used mainly angular-material field, button and table
The project of course is sass style based, in the src/app/app.component.sass i setup few class.

Clone the repo  and  "npm install" dependencies.
I prepared some scripts.

"npm start-server" to compile angular app in dev mode (to enable redux dev tools ), transpile nodejs app and start node server , you can acces the app at http://locahost:3000

"npm run test-server" to execute mocha-chai towards  API node server endoint

"npm run test" to execute frontend tests, whic include app.component(form validity and dispatch), reducers, actions , effects and selector
 
As for the docker ,i was very short on time and I also noticed i still run win7 at home while the actual docker run on win 10  so i couldnt event test.So i decided to omit

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.6.

Look forward to hear your feedback and have the opportunity to discuss in detail the assignmant.
Regards
Dario
