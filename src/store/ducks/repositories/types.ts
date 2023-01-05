// eslint-disable-next-line no-shadow
import IGoalsTypes from '@app/interfaces/IGoalsTypes';

export enum GoalsTypes {
  LOAD_GOALS = '@repositories/LOAD_GOAL',
  CREATE_GOAL = '@repositories/CREATE_GOAL',
}

export interface Goals {
  id: string;
  type: IGoalsTypes;
  date: Date;
  amount: string;
  value: string;
  completed: boolean;
}

export interface GoalsState {
  readonly data: Goals[];
  readonly loading: boolean;
  readonly error: boolean;
}
