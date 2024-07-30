import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HeaderModule } from "@app/components/sections/header/header.module";
import { noSubRoutes } from "@app/helpers/routes";
import { DocumentsComponent } from './documents.component';

@NgModule({
  declarations: [
    DocumentsComponent
  ],
  imports: [
    RouterModule.forChild(noSubRoutes(DocumentsComponent)),
    CommonModule,
    HeaderModule
  ]
})
export class DocumentsModule { }
