import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { noSubRoutes } from "@app/helpers/routes";
import { DocumentsViewComponent } from "./documents-view.component";

@NgModule({
  declarations: [
    DocumentsViewComponent
  ],
  imports: [
    RouterModule.forChild(noSubRoutes(DocumentsViewComponent)),
    CommonModule
  ]
})
export class DocumentsViewModule { }
