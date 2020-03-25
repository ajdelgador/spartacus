import { Budget } from '../../../model/budget.model';
import { LoaderAction } from '../../../state/utils/loader/loader.action';
import { CostCenterActions, BudgetActions } from '../actions/index';

export const budgetInitialState = {};
export const budgetsInitialState = undefined;

export function budgetsEntitiesReducer(
  state: Budget = budgetInitialState,
  action: LoaderAction
): Budget {
  switch (action.type) {
    case BudgetActions.LOAD_BUDGET_SUCCESS:
    case BudgetActions.CREATE_BUDGET_SUCCESS:
    case BudgetActions.UPDATE_BUDGET_SUCCESS:
      return action.payload;
    case CostCenterActions.UNASSIGN_BUDGET_SUCCESS:
    case CostCenterActions.ASSIGN_BUDGET_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
  }
  return state;
}

export function budgetsListReducer(
  state = budgetsInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case BudgetActions.LOAD_BUDGETS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
