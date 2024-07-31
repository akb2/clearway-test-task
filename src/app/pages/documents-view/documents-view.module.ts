import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BaseLayoutModule } from "@app/components/layouts/base-layout/base-layout.module";
import { DocumentViewerModule } from "@app/components/views/document-viewer/document-viewer.module";
import { noSubRoutes } from "@app/helpers/routes";
import { DocumentsViewComponent } from "./documents-view.component";

@NgModule({
  declarations: [
    DocumentsViewComponent
  ],
  imports: [
    RouterModule.forChild(noSubRoutes(DocumentsViewComponent)),
    CommonModule,
    BaseLayoutModule,
    DocumentViewerModule
  ]
})
export class DocumentsViewModule { }
