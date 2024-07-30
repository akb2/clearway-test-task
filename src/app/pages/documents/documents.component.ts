import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "page-documents",
  templateUrl: "./documents.component.html",
  styleUrls: ["./documents.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsComponent {
}
