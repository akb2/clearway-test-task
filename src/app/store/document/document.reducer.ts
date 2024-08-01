import { createReducer, on } from "@ngrx/store";
import { documentAddSnippetAction, documentUpdateItemsAction, documentUpdateSnippetsAction } from "./document.actions";
import { documentInitialState } from "./document.state";

export const documentReducer = createReducer(
  documentInitialState,
  // Обновить список документов
  on(documentUpdateItemsAction, (state, { documents }) => ({
    ...state,
    documents: [...documents]
  })),
  // Добавить сниппет
  on(documentAddSnippetAction, (state) => ({ ...state })),
  // Обновить список
  on(documentUpdateSnippetsAction, (state, { snippets }) => ({ ...state, snippets }))
);
