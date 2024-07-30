import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  // Основное
  { path: "", redirectTo: "/documents", pathMatch: "full" },
  // { path: "**", redirectTo: "/documents" },
  // Список документов
  { path: "documents", loadChildren: () => import("./pages/documents/documents.module").then(m => m.DocumentsModule) },
  // Открытие документа
  { path: "documents/view/:id", loadChildren: () => import("./pages/documents-view/documents-view.module").then(m => m.DocumentsViewModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
