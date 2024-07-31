import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BreadCrumbs } from "@app/models/ui";

@Component({
  selector: "page-documents-view",
  templateUrl: "./documents-view.component.html",
  styleUrls: ["./documents-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsViewComponent {
  loading = true;

  get breadCrumbs() {
    const documentsList: BreadCrumbs = {
      title: "Документы",
      link: "/documents"
    };
    const documentsView: BreadCrumbs = {
      title: "Загрузка..."
    };

    return [documentsList, documentsView];
  }
}
