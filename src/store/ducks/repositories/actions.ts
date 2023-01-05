/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { action } from 'typesafe-actions';
import { GoalsTypes, Goals } from './types';

export const loadGoals = (data: Goals[]) => action(GoalsTypes.LOAD_GOALS, data);

export const createGoal = (data: Goals) =>
  action(GoalsTypes.CREATE_GOAL, { data });
