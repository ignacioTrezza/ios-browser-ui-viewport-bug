import { Directive, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appViewportDirective]'
})
export class ViewportDirectiveDirective implements OnInit {
  private initialHeight: number = 0;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.initialHeight = window.innerHeight;
    this.setViewportDimensions();
  }

  @HostListener('window:resize')
  @HostListener('window:orientationchange')
  onViewportChange(): void {
    this.updateViewportDimensions();
  }

  @HostListener('window:focus', ['$event.target'])
  onFocus(target: EventTarget): void {
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      this.updateViewportDimensions();
    }
  }

  @HostListener('window:blur', ['$event.target'])
  onBlur(target: EventTarget): void {
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      this.updateViewportDimensions();
    }
  }

  private updateViewportDimensions(): void {
    requestAnimationFrame(() => {
      this.setViewportDimensions();
    });
  }

  private setViewportDimensions(): void {
    const visualHeight = window.visualViewport?.height || window.innerHeight;
    const visualWidth = window.visualViewport?.width || window.innerWidth;

    const toolbarHeight = window.outerHeight - window.innerHeight;
    const adjustedHeight = window.visualViewport ? visualHeight : visualHeight - toolbarHeight;

    const finalHeight = adjustedHeight < this.initialHeight ? adjustedHeight : this.initialHeight;

    const vh = finalHeight * 0.01;
    const vw = visualWidth * 0.01;

    this.renderer.setStyle(document.documentElement, '--vh', `${vh}px`);
    this.renderer.setStyle(document.documentElement, '--vw', `${vw}px`);
  }
}
 