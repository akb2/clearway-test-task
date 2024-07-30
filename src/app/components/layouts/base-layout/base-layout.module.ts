import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { HeaderModule } from "@app/components/sections/header/header.module";
import { BaseLayoutComponent } from "./base-layout.component";

@NgModule({
  declarations: [
    BaseLayoutComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    MatProgressSpinnerModule
  ],
  exports: [
    BaseLayoutComponent
  ]
})
export class BaseLayoutModule { }
