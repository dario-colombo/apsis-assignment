import { Game } from './../../models/game.model';
import * as fromGame from './game.reducer';
 import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
 
/*  export interface SlicetsState {
  gameStateSlice: fromGame.GameState;

}  
 */
export const reducers: ActionReducerMap<any> = {
   gameStateSlice : fromGame.reducer,
};



export const selectFeature = (state) => state.gameStateSlice;
export const getGamesState = createSelector(
  selectFeature,
  (state) => state.game
);

export * from './game.reducer';
