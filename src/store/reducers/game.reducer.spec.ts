import { Store } from '@ngrx/store';
import { UpdateGame } from './../actions/game.action';

import * as fromReducers from './game.reducer';
import * as fromActions from '../actions/game.action';
import { Game } from '../../models/game.model';
describe('REDUCER', () => {
    describe('UPDATE_GAME_SUCCESS', () => {
        it('should return the Game with score calculated', () => {
            const game: Game = {
                frames: [{ first: 4, second: 6 }],
                score: 10
            }
                ;
            const newGame: Game = {
                frames: [{ first: 4, second: 6 }, { first: 4, second: 6 }],
                score: 20
            };

            const { initialState } = fromReducers;
            const previousState = { ...initialState, game };
            const action = new fromActions.UpdateGameSuccess(newGame);
            const state = fromReducers.reducer(previousState, action);
            //  console.log(state);

            expect(Object.keys(state.game.frames).length).toEqual(2);
            expect(state.game.score).toEqual(20);
        });
    });

    describe('UNDEFINED', () => {
        it('should return the current state', () => {
            const { initialState } = fromReducers;
            const action = {} as any;
            const state = fromReducers.reducer(undefined, action);
            //  console.log(state);
            expect(state).toBe(initialState);
        });
    });
});
describe('SELECTOR', () => {
    describe('getGameFrames', () => {
        it('should return state.game.frames', () => {
            const game: Game = {
                frames: [{ first: 4, second: 6 }],
                score: 10
            };
            const { initialState } = fromReducers;
            const previousState = { ...initialState, game };
            const slice = fromReducers.getGameFrames(previousState);
            expect(slice).toEqual(game.frames);
        });
    });
});
