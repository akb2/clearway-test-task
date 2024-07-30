import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import { documentReducer } from "./document/document.reducer";

export const appReducer: ActionReducerMap<AppState> = {
  document: documentReducer
};
