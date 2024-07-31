import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { DirectivesModule } from "@app/modules/directives.module";
import { DocumentViewerComponent } from './document-viewer.component';

@NgModule({
  declarations: [
    DocumentViewerComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    DocumentViewerComponent
  ]
})
export class DocumentViewerModule { }
