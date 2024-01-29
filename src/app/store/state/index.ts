import { dataBusState } from './dataBus.state';
import { uiState } from './ui.state';

export interface AppState {
  dataBus: dataBusState;
  ui: uiState;
}

export * from './dataBus.state';
export * from './ui.state';
