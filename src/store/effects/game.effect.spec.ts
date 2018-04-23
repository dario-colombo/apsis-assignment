
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { GameService } from '../../services/game.service';
import * as fromEffects from './game.effect';
import * as fromActions from '../actions/game.action';

export class TestActions extends Actions {
    constructor() {
        super(empty());
    }

    set stream(source: Observable<any>) {
        this.source = source;
    }
}

export function getActions() {
    return new TestActions();
}
describe('EFFECTS', () => {
    let actions$: TestActions;
    let service: GameService;
    let effects: fromEffects.GameEffects;

    const game = {
        frames: [{ first: 4, second: 6 }],
        score: 10
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                GameService,
                fromEffects.GameEffects,
                { provide: Actions, useFactory: getActions },
            ],
        });

        actions$ = TestBed.get(Actions);
        service = TestBed.get(GameService);
        effects = TestBed.get(fromEffects.GameEffects);
        spyOn(service, 'updateGame').and.returnValue(of(game[0]));
    });

    describe('updateGame$', () => {
        it('should not throw error', () => {
            const action = new fromActions.UpdateGame(game[0]);
            const completion = new fromActions.UpdateGameSuccess(game[0]);
            actions$.stream = hot('-a', { a: action });
            const expected = cold('-c', { c: completion });
            expect(effects.updateGame$).toBeObservable(expected);
        });
    });



});
