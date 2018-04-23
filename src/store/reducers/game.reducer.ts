import { Game } from './../../models/game.model';
import * as fromGame from '../actions/game.action';
import { createSelector } from '@ngrx/store';


export interface GameState {
  game: Game;
  loaded: boolean;
  loading: boolean;
}

export const initialState: GameState = {
  game: {
    frames: [],
    score: 0
  },
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: fromGame.GameAction
): GameState {
  switch (action.type) {
    case fromGame.UPDATE_GAME: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromGame.UPDATE_GAME_SUCCESS: {
      const game = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        game
      };
    }

    case fromGame.UPDATE_GAME_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

  }

  return state;
}

export const getGameFrames = (state: GameState) => state.game.frames;
