import { Action } from '@ngrx/store';

import { Game } from '../../models/game.model';


// update Game
export const UPDATE_GAME = '[GAME] Update Game';
export const UPDATE_GAME_FAIL = '[GAME] Update  Fail';
export const UPDATE_GAME_SUCCESS = '[GAME] Update Success';

export class UpdateGame implements Action {
  readonly type = UPDATE_GAME;
  constructor(public payload: Game ) {}
}

export class UpdateGameFail implements Action {
  readonly type = UPDATE_GAME_FAIL;
  constructor(public payload: any) {}
}

export class UpdateGameSuccess implements Action {
  readonly type = UPDATE_GAME_SUCCESS;
  constructor(public payload: Game ) {}
}

// action types
export type GameAction =  UpdateGame | UpdateGameFail | UpdateGameSuccess;
