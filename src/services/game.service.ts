import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { catchError, map, scan } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { Game, ShotResult, Shot } from './../models/game.model';
import cloneDeep = require('lodash/cloneDeep');
@Injectable()
export class GameService {

  constructor(private http: HttpClient) { }

  updateGame(payload: Game): Observable<Game> {
    // local service;

    /* 
    const answer = cloneDeep(payload);
    const score = answer.frames.reduce((total, shot, index, array) => {
      let partialSum = shot.first + shot.second;
      // BONUS SHOTS
      if (index === 0) {
        if (shot.first === 10) {
          shot.bonus = 2;
        } else if (shot.first + shot.second === 10) {
          shot.bonus = 1;
        } else {
          shot.bonus = 0;
        }
      }

      // CALCULATE POINTS
      if (shot.first === 10 && index < 9) {
        shot.shotResult = ShotResult.Strike;
      } else if (shot.first + shot.second === 10 && index < 9) {
        shot.shotResult = ShotResult.Spare;
      } else {
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
    console.log(score);

    answer.score = score;

    return Observable.of(answer)
      .pipe(
        catchError((error: any) => Observable.throw(error.json()))
      );
       */


    // API;
    return this.http
      .post<Game>(`/api/apsis`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));



  }

}
