import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { BreadCrumbs } from "@app/models/ui";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() title = "Тестовое задание";
  @Input() breadCrumbs: BreadCrumbs[] = [];
}
