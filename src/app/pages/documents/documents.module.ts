import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { BaseLayoutModule } from "@app/components/layouts/base-layout/base-layout.module";
import { noSubRoutes } from "@app/helpers/routes";
import { DocumentsComponent } from './documents.component';

@NgModule({
  declarations: [
    DocumentsComponent
  ],
  imports: [
    RouterModule.forChild(noSubRoutes(DocumentsComponent)),
    CommonModule,
    BaseLayoutModule
  ]
})
export class DocumentsModule { }
