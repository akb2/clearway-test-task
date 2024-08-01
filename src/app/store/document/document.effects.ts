import { Injectable } from "@angular/core";
import { AnyToArray } from "@app/helpers/converters";
import { LocalStorageGet, LocalStorageSet } from "@app/helpers/local-storage";
import { DocumentService } from "@app/services/document.service";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs";
import { documentAddSnippetAction, documentUpdateItemsAction, documentUpdateSnippetsAction } from "./document.actions";
import { documentSippetsSelector } from "./document.selectors";
import { DOCUMENT_SNIPPETS_LOCAL_STORAGE_KEY } from "./document.state";

@Injectable()
export class DocumentEffects {
  constructor(
    private store$: Store,
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

  // Загрузка сниппетов
  loadSnippets$ = createEffect(
    () => this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => documentUpdateSnippetsAction({ snippets: AnyToArray(LocalStorageGet(DOCUMENT_SNIPPETS_LOCAL_STORAGE_KEY)) }))
    )
  );

  // Добавление списка сниппетов
  addSnippet$ = createEffect(
    () => this.actions$.pipe(
      ofType(documentAddSnippetAction),
      withLatestFrom(this.store$.select(documentSippetsSelector)),
      map(([{ snippet }, oldSnippets]) => {
        const id = oldSnippets.reduce((max, { id }) => Math.max(max, id), 0) + 1;
        const snippets = [...oldSnippets, { ...snippet, id }];

        LocalStorageSet(DOCUMENT_SNIPPETS_LOCAL_STORAGE_KEY, snippets);

        return documentUpdateSnippetsAction({ snippets });
      })
    )
  );
}
