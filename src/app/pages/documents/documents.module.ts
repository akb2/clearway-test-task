import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { noSubRoutes } from "@app/helpers/routes";
import { DocumentsComponent } from './documents.component';

@NgModule({
  declarations: [
    DocumentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(noSubRoutes(DocumentsComponent))
  ],
})
export class DocumentsModule { }
