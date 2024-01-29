import { AppState, dataBusState } from '../state';

export const selectDataBus = (state: AppState): dataBusState => state.dataBus;
