import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { documentListSelector } from "@app/store/document/document.selectors";
import { Store } from "@ngrx/store";
import { skipWhile, Subject, takeUntil, takeWhile } from "rxjs";

@Component({
  selector: "page-documents",
  templateUrl: "./documents.component.html",
  styleUrls: ["./documents.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsComponent implements OnInit, OnDestroy {
  loading = true;

  documents$ = this.$store.select(documentListSelector);

  private destroyed$ = new Subject<void>();

  constructor(
    private $store: Store,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.documentFirstLoadingListener();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private documentFirstLoadingListener() {
    this.documents$
      .pipe(
        takeWhile(documents => !documents.length, true),
        skipWhile(documents => !documents.length),
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      });
  }
}
