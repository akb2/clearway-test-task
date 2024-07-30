import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AnyToArray, AnyToInt, AnyToString } from "@app/helpers/converters";
import { DocumentItem } from "@app/models/document";
import { map } from "rxjs";

@Injectable({ providedIn: "root" })
export class DocumentService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getList() {
    return this.httpClient.get("/assets/mock/documents.json").pipe(
      map((responce: any) => AnyToArray(responce?.pages).map(this.dtoToDocumentItem))
    );
  }

  /*
  * Конвертеры
  */

  private dtoToDocumentItem(dto: any): DocumentItem {
    const id = AnyToInt(dto?.number);
    const name = "Документ #" + id;
    const imageUrl = AnyToString(dto?.imageUrl);

    return { id, name, imageUrl };
  }
}
