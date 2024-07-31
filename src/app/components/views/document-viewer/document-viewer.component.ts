import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { AnyToInt } from "@app/helpers/converters";
import { DocumentItem } from "@app/models/document";
import { fromEvent, merge, Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-document-viewer",
  templateUrl: "./document-viewer.component.html",
  styleUrls: ["./document-viewer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentViewerComponent implements OnInit, OnDestroy {
  @Input() document: DocumentItem;

  private containerWidth = 0;
  private containerHeight = 0;
  private containerPaddingX = 0;
  private containerPaddingY = 0;

  private imageOriginalWidth = 0;
  private imageOriginalHeight = 0;
  private imageShiftX = 0;
  private imageShiftY = 0;

  private zoom = 1;
  private zoomStep = 1;
  private zoomMin = 1;
  private zoomMax = 8;

  isDragging = false;
  private dragLastX = 0;
  private dragLastY = 0;

  private destroyed$ = new Subject<void>();

  get imageStyles() {
    if (this.containerWidth > 0 && this.containerHeight > 0 && this.imageOriginalWidth > 0 && this.imageOriginalHeight > 0) {
      const availableWidth = this.containerWidth - this.containerPaddingX;
      const availableHeight = this.containerHeight - this.containerPaddingY;
      const aspectRatio = this.imageOriginalWidth / this.imageOriginalHeight;
      const isVertical = availableWidth / availableHeight > aspectRatio;
      const originalWidth = isVertical
        ? availableHeight * aspectRatio
        : availableWidth;
      let originalHeight = isVertical
        ? availableHeight
        : availableWidth / aspectRatio;
      const width = originalWidth * this.zoom;
      const height = originalHeight * this.zoom;
      const initialShiftX = (availableWidth - width) / 2;
      const initialShiftY = (availableHeight - height) / 2;
      const maxShiftX = width > availableWidth
        ? (width - availableWidth) / 2
        : 0;
      const maxShiftY = height > availableHeight
        ? (height - availableHeight) / 2
        : 0;
      const left = Math.min(initialShiftX + maxShiftX, Math.max(initialShiftX - maxShiftX, this.imageShiftX));
      const top = Math.min(initialShiftY + maxShiftY, Math.max(initialShiftY - maxShiftY, this.imageShiftY));

      this.imageShiftX = left;
      this.imageShiftY = top;

      return {
        width: width + "px",
        height: height + "px",
        left: left + "px",
        top: top + "px"
      };
    }

    return {};
  }

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.mouseListeners();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onResize(event: ResizeObserverEntry) {
    const element = event.target as HTMLDivElement;

    this.containerWidth = event.contentRect.width;
    this.containerHeight = event.contentRect.height;
    this.containerPaddingY = AnyToInt(element.style.paddingTop) + AnyToInt(element.style.paddingBottom);
    this.containerPaddingX = AnyToInt(element.style.paddingLeft) + AnyToInt(element.style.paddingRight);

    this.changeDetectorRef.detectChanges();
  }

  onImageLoad(event: Event) {
    const imgElement = event.target as HTMLImageElement;

    this.imageOriginalWidth = imgElement.naturalWidth;
    this.imageOriginalHeight = imgElement.naturalHeight;

    this.changeDetectorRef.detectChanges();
  }

  onZoomIn() {
    this.setZoom(this.zoom + this.zoomStep);
  }

  onZoomOut() {
    this.setZoom(this.zoom - this.zoomStep);
  }

  onStartDrag(event: MouseEvent) {
    event.preventDefault();

    this.isDragging = true;
    this.dragLastX = event.clientX;
    this.dragLastY = event.clientY;

    this.changeDetectorRef.detectChanges();
  }

  private onDrag(event: MouseEvent) {
    event.preventDefault();

    if (this.isDragging) {
      const deltaX = event.clientX - this.dragLastX;
      const deltaY = event.clientY - this.dragLastY;

      this.imageShiftX += deltaX;
      this.imageShiftY += deltaY;
      this.dragLastX = event.clientX;
      this.dragLastY = event.clientY;

      this.changeDetectorRef.detectChanges();
    }
  }

  private onStopDrag(event: MouseEvent) {
    event.preventDefault();

    this.isDragging = false;

    this.changeDetectorRef.detectChanges();
  }

  private mouseListeners() {
    merge(
      fromEvent<MouseEvent, void>(document, "mouseup", event => this.onStopDrag(event)),
      fromEvent<MouseEvent, void>(document, "mousemove", event => this.onDrag(event))
    )
      .pipe(takeUntil(this.destroyed$))
      .subscribe();
  }

  private setZoom(zoom: number) {
    const oldZoom = this.zoom;
    const newZoom = Math.max(this.zoomMin, Math.min(this.zoomMax, zoom));
    const screenHalfX = (this.containerWidth - this.containerPaddingX) / 2;
    const screenHalfY = (this.containerHeight - this.containerPaddingY) / 2;

    this.imageShiftX = -((-this.imageShiftX + screenHalfX) / oldZoom * newZoom) + screenHalfX;
    this.imageShiftY = -((-this.imageShiftY + screenHalfY) / oldZoom * newZoom) + screenHalfY;
    this.zoom = newZoom;

    this.changeDetectorRef.detectChanges();
  }
}
