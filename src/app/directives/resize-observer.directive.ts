import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output } from "@angular/core";

@Directive({
  selector: '[resizeObserver]'
})
export class ResizeObserverDirective implements AfterViewInit, OnDestroy {
  @Output() resized = new EventEmitter<ResizeObserverEntry>();

  private resizeObserver$ = new ResizeObserver(entries => entries.forEach(entry => this.resized.emit(entry)));

  constructor(
    private elementRef: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this.resizeObserver$.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver$.disconnect();
  }
}
