import { environment } from './../environments/environment.prod';

import { UpdateGame } from './../store/actions/game.action';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, NgForm, Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import cloneDeep = require('lodash/cloneDeep');

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../store';
import { Game, ShotResult } from '../models/game.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {

  gameForm: FormGroup;
  cloned_game: Game;
  status: string = 'Play';
  starting_shots = 10;
  avilable_shots: number;
  frames$: Observable<Game>;
  store_observable: Observable<any>;
  subscription;
  displayedColumns = ['position', 'first', 'second', 'bonus', 'shotResult', 'augmentedPoints'];

  constructor(private store: Store<any>, public fb: FormBuilder) {
    this.store_observable = store.pipe(select(fromStore.getGamesState));
    this.subscription = this.store_observable.subscribe(game => {
      this.frames$ = game;
      this.cloned_game = cloneDeep(game);
      if (this.cloned_game.frames.length > 9) {
        this.avilable_shots = this.starting_shots - this.cloned_game.frames.length + this.cloned_game.frames[9].bonus;
      } else {
        this.avilable_shots = this.starting_shots - this.cloned_game.frames.length;
      }
      if (this.avilable_shots === 0) {
        this.status = 'Game Over';
      }


    });

  }
  ngOnInit() {
    this.gameForm = this.fb.group({
      first: ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(10)])],
      second: ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(10)])]
    }); // ,{ validator: this.watchSum('first', 'second') });

  }
  watchSum(first: string, second: string) {
    return (group) => {
      if (group.controls[first].value + group.controls[second].value > 10) {
        return group.controls[first].setErrors('sum cannot be greater than 10');
      }
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  chekSum() {
    return (this.gameForm.value.first + this.gameForm.value.second) > 10 ? true : false;
  }


  onSubmit(gameForm: NgForm) {
    this.cloned_game.frames.push(this.gameForm.value);
    this.store.dispatch(new fromStore.UpdateGame(this.cloned_game));
  }
}



