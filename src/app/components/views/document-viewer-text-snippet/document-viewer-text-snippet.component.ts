import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "app-document-viewer-text-snippet",
  templateUrl: "./document-viewer-text-snippet.component.html",
  styleUrls: ["./document-viewer-text-snippet.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentViewerTextSnippetComponent {
  @Input() sizeEditing = false;
  @Input() width = 0;
  @Input() height = 0;
  @Input() top = 0;
  @Input() left = 0;

  get styles() {
    return {
      width: this.width + "%",
      height: this.height + "%",
      top: this.top + "%",
      left: this.left + "%"
    };
  }
}
