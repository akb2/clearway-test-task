import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AnyToInt } from "@app/helpers/converters";
import { BreadCrumbs } from "@app/models/ui";
import { documentListSelector } from "@app/store/document/document.selectors";
import { Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, map, skipWhile, Subject, take, takeUntil } from "rxjs";

@Component({
  selector: "page-documents-view",
  templateUrl: "./documents-view.component.html",
  styleUrls: ["./documents-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsViewComponent implements OnInit, OnDestroy {
  loading = true;

  private documentsList$ = this.store$.select(documentListSelector);
  documentId$ = new BehaviorSubject<number>(undefined);


  document$ = combineLatest([this.documentsList$, this.documentId$]).pipe(
    map(([documentsList, documentId]) => !!documentId && documentsList.find(({ id }) => documentId === id))
  );

  breadCrumbs$ = this.document$.pipe(
    map(document => {
      const documentsList: BreadCrumbs = {
        title: "Документы",
        link: "/documents"
      };
      const documentsView: BreadCrumbs = {
        title: !!document
          ? document.name
          : "Загрузка..."
      };

      return [documentsList, documentsView];
    })
  );

  private destroyed$ = new Subject<void>();

  constructor(
    private store$: Store,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.documentIdLitener();
    this.loaderListener();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.documentId$.complete();
  }

  private documentIdLitener() {
    this.activatedRoute.params
      .pipe(
        take(1),
        takeUntil(this.destroyed$)
      )
      .subscribe(data => this.documentId$.next(AnyToInt(data?.["id"])));
  }

  private loaderListener() {
    this.document$
      .pipe(
        skipWhile(document => !document),
        take(1),
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      });
  }
}
