import { UpdateGame, UPDATE_GAME_SUCCESS } from './../actions/game.action';
import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import * as gameActions from '../actions/game.action';
import * as fromServices from '../../services';

@Injectable()
export class GameEffects {
  constructor(
    private actions$: Actions,
    private gameService: fromServices.GameService
  ) { }


  @Effect()
  updateGame$ = this.actions$.ofType(gameActions.UPDATE_GAME)
    .pipe(
      map((action: gameActions.UpdateGame) => action.payload),
      switchMap(Game => {
        return this.gameService
          .updateGame(Game)
          .pipe(
            tap(v => console.log(v)),
            map(game => new gameActions.UpdateGameSuccess(game)),
            catchError(error => of(new gameActions.UpdateGameFail(error)))
          );
      })
    );

}
