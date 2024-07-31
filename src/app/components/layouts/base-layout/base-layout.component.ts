import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { BreadCrumbs } from "@app/models/ui";

@Component({
  selector: "base-layout",
  templateUrl: "./base-layout.component.html",
  styleUrls: ["./base-layout.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseLayoutComponent implements OnInit {
  @Input() loading = false;
  @Input() title = "";
  @Input() breadCrumbs: BreadCrumbs[] = [];

  constructor(
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}
