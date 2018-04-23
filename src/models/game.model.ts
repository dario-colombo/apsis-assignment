export interface Game {
  frames: Shot[];
  score: number;
}
export enum ShotResult {
  Strike = 'Strike',
  Spare = 'Spare',
  Open = 'Open'
}

export interface Shot {
  first: number;
  second: number;
  bonus?: number;
  shotResult?: ShotResult;
  augmentedPoints?: number;
}
