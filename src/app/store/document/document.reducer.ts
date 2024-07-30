import { createReducer, on } from "@ngrx/store";
import { documentUpdateItemsAction } from "./document.actions";
import { documentInitialState } from "./document.state";

export const documentReducer = createReducer(
  documentInitialState,
  // Обновить список документов
  on(documentUpdateItemsAction, (state, { documents }) => ({
    ...state,
    documents: [...documents]
  }))
);
