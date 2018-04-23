"use strict";
exports.__esModule = true;
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cloneDeep = require("lodash/cloneDeep");
var game_model_1 = require("./src/models/game.model");
var mock = require('./mockdata.json');
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        // FRONTEND
        var angularApp = express.static(path.join(__dirname, 'dist'));
        this.express.use('/', angularApp);
        //  API;
        this.express.post('/api/apsis', function (req, res) {
            //GAME LOGIC
            var answer = cloneDeep(req.body);
            var score = answer.frames.reduce(function (total, shot, index, array) {
                var partialSum = shot.first + shot.second;
                // BONUS SHOTS
                if (index === 9) {
                    if (shot.first === 10) {
                        shot.bonus = 2;
                    }
                    else if (shot.first + shot.second === 10) {
                        shot.bonus = 1;
                    }
                    else {
                        shot.bonus = 0;
                    }
                }
                // CALCULATE POINTS
                if (shot.first === 10 && index < 9) {
                    shot.shotResult = game_model_1.ShotResult.Strike;
                }
                else if (shot.first + shot.second === 10 && index < 9) {
                    shot.shotResult = game_model_1.ShotResult.Spare;
                }
                else {
                    shot.shotResult = game_model_1.ShotResult.Open;
                }
                if (index + 1 < array.length && shot.shotResult === game_model_1.ShotResult.Strike) {
                    // add the sum of the next WHOLE shot
                    partialSum += array[index + 1].first + array[index + 1].second;
                }
                if (index + 1 < array.length && shot.shotResult === game_model_1.ShotResult.Spare) {
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
    };
    return App;
}());
exports["default"] = new App().express;
