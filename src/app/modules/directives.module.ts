import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ResizeObserverDirective } from "@app/directives/resize-observer.directive";

@NgModule({
  declarations: [
    ResizeObserverDirective
  ],
  imports: [],
  exports: [
    ResizeObserverDirective
  ]
})
export class DirectivesModule { }
