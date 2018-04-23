import { UpdateGame, UpdateGameSuccess } from './../store/actions/game.action';
import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component, DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { By } from '@angular/platform-browser';


import * as fromRoot from '../store/reducers';
import { StoreModule, Store, combineReducers } from '@ngrx/store';


import { reducers } from './../store';

import * as actions from '../store/actions';



describe('APP COMPONENT', () => {

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let store;
    let loginBtn: HTMLButtonElement;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                MatInputModule, MatButtonModule, MatTableModule, BrowserAnimationsModule,
                ReactiveFormsModule, FormsModule,
                StoreModule.forRoot(reducers)],
            declarations: [AppComponent]
        });

        store = TestBed.get(Store);



        // create component and test fixture
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        spyOn(store, 'dispatch').and.callThrough();

    });
    describe('DISPATCH', () => {

        it('should dispatch an action upon submit', async(() => {

            const payload = {
                frames: [{ first: 4, second: 6 }],
                score: 0
            };
            const action = new actions.UpdateGame(payload);
            fixture.whenStable().then(() => {
                const first = component.gameForm.controls['first'];
                first.setValue(4);
                const second = component.gameForm.controls['second'];
                second.setValue(6);
                component.onSubmit(component.gameForm.value);
                fixture.detectChanges();

                expect(store.dispatch).toHaveBeenCalledWith(action);

            });
        }));


        it('should receive an updated score after the UpdateGameSuccess ', () => {
            const payload = {
                frames: [{ first: 4, second: 6 }],
                score: 10
            };
            const action = new actions.UpdateGameSuccess(payload);

            store.dispatch(action);

            component.store_observable.subscribe(data => {
                expect(data.score).toEqual(10);
            });
        });

    });
    describe('FORM', () => {
        it('form invalid when empty', () => {
            fixture.detectChanges();
            expect(component.gameForm.valid).toBeFalsy();
        });

        it('first field validity', () => {
            fixture.detectChanges();
            let errors = {};
            const first = component.gameForm.controls['first'];
            expect(first.valid).toBeFalsy();
            // first field is required
            errors = first.errors || {};
            expect(errors['required']).toBeTruthy();
            // Set first to something correct
            first.setValue(1);
            errors = first.errors || {};
            expect(errors['required']).toBeFalsy();
        });
        it('submit disabled if form !valid', () => {
            fixture.detectChanges();
            loginBtn = fixture.debugElement.query(By.css('.loginButton')).nativeElement;
            expect(loginBtn.disabled).toBeTruthy();

        });
        it('should check login Btn is enabled after inputs', async(() => {
            fixture.detectChanges();
            loginBtn = fixture.debugElement.query(By.css('.loginButton')).nativeElement;
            fixture.whenStable().then(() => {
                const first = component.gameForm.controls['first'];
                first.setValue(1);
                const second = component.gameForm.controls['second'];
                second.setValue(1);
                fixture.detectChanges();
                expect(loginBtn.disabled).toBe(false);
            });
        }));
    });



});
