import { Action, createReducer, on } from '@ngrx/store';
import { setLoadingState } from '../actions/ui.actions';
import { UIModel } from '@app/models/store/ui';
import { uiState } from '../state';

const initialState = new UIModel() as uiState;

const uiReducer = createReducer(
  initialState,

  on(setLoadingState, (state, action) => {
    const _d = { ...state };
    _d.loader[action.node].isLoading = action.isLoading;

    return _d;
  })
);

export default function reducer(state: uiState, action: Action): uiState {
  return uiReducer(state, action);
}
