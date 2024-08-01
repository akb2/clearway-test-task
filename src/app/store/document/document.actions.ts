import { DocumentItem, DocumentItemSnippet } from "@app/models/document";
import { createAction, props } from "@ngrx/store";

export const documentUpdateItemsAction = createAction(
  "[ДОКУМЕНТЫ] Сохранение списка документов",
  props<{ documents: DocumentItem[] }>()
);

export const documentAddSnippetAction = createAction(
  "[ДОКУМЕНТЫ] Добавление сниппета",
  props<{ snippet: Omit<DocumentItemSnippet, "id"> }>()
);

export const documentUpdateSnippetsAction = createAction(
  "[ДОКУМЕНТЫ] Обновления списка сниппетов",
  props<{ snippets: DocumentItemSnippet[] }>()
);
