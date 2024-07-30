import { Injectable } from "@angular/core";
import { DocumentService } from "@app/services/document.service";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { documentUpdateItemsAction } from "./document.actions";

@Injectable()
export class DocumentEffects {
  constructor(
    private actions$: Actions,
    private documentService: DocumentService
  ) { }

  // Загрузка списка документов
  loadDocuments$ = createEffect(
    () => this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() => this.documentService.getList()),
      map(documents => documentUpdateItemsAction({ documents }))
    )
  );
}
