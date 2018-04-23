import * as fromGame from './game.action';
describe('ACTION', () => {
    describe('UPDATE_GAME', () => {
        it('should create an action', () => {
            const payload = {
                frames: [{ first: 4, second: 6 }],
                score: null
            };
            const action = new fromGame.UpdateGame(payload);

            expect({ ...action }).toEqual({
                type: fromGame.UPDATE_GAME,
                payload,
            });
        });
    });

    describe('UPDATE_GAME_FAIL', () => {
        it('should create an action', () => {
            const payload = { message: 'returned error' };
            const action = new fromGame.UpdateGameFail(payload);

            expect({ ...action }).toEqual({
                type: fromGame.UPDATE_GAME_FAIL,
                payload,
            });
        });
    });

    describe('UPDATE_GAME_SUCCESS', () => {
        it('should create an action', () => {
            const payload = {
                frames: [{ first: 4, second: 6 }],
                score: 10
            };
            const action = new fromGame.UpdateGameSuccess(payload);

            expect({ ...action }).toEqual({
                type: fromGame.UPDATE_GAME_SUCCESS,
                payload,
            });
        });
    });
});
