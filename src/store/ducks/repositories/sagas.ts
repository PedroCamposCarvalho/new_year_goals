import { AnyAction } from 'redux';
import { loadGoals, createGoal } from './actions';

export function load(action: AnyAction): any {
  loadGoals(action.payload.data);
}
export function create(action: AnyAction): any {
  createGoal(action.payload.data);
}
