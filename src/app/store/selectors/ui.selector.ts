import { AppState, uiState } from '../state';

export const selectUI = (state: AppState): uiState => state.ui;
