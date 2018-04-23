import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import cloneDeep = require('lodash/cloneDeep');
import { ShotResult } from './src/models/game.model';
const mock = require('./mockdata.json');



// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    // Configure API endpoints.
    private routes(): void {
        // FRONTEND
        const angularApp = express.static(path.join(__dirname, 'dist'));
        this.express.use('/', angularApp);

        //  API;
        this.express.post('/api/apsis', function (req, res) {

            //GAME LOGIC
            const answer = cloneDeep(req.body);
            const score = answer.frames.reduce((total, shot, index, array) => {
              let partialSum = shot.first + shot.second;
              // BONUS SHOTS
              if (index === 9) {
                if (shot.first === 10) {
                  shot.bonus = 2;
                } else if (shot.first + shot.second === 10) {
                  shot.bonus = 1;
                } else {
                  shot.bonus = 0;
                }
              }        
              // CALCULATE POINTS
              if (shot.first === 10 && index < 9) { //strike
                shot.shotResult = ShotResult.Strike;
              } else if (shot.first + shot.second === 10 && index < 9) { //spare
                shot.shotResult = ShotResult.Spare;
              } else { //open
                shot.shotResult = ShotResult.Open;
              }
              if (index + 1 < array.length && shot.shotResult === ShotResult.Strike) {
                // add the sum of the next WHOLE shot
                partialSum += array[index + 1].first + array[index + 1].second;
              }
              if (index + 1 < array.length && shot.shotResult === ShotResult.Spare) {
                // add the sum of the next FIRST shot
                partialSum += array[index + 1].first;
              }
              shot.augmentedPoints = partialSum;
              console.log('partialSum for row ' + index + ' =' + partialSum);
              total += partialSum;
              return total;
            }, 0);
           // console.log(score);
        
            answer.score = score;
            res.send(answer);
        });
        // catch -> redirect to home 
        this.express.all('*', function (req, res) {
            res.redirect("/");
        });
    }

}

export default new App().express;
