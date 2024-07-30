import { DocumentItem } from "@app/models/document";
import { createAction, props } from "@ngrx/store";

export const documentUpdateItemsAction = createAction(
  "[ДОКУМЕНТЫ] Сохранение списка документов",
  props<{ documents: DocumentItem[] }>()
);
