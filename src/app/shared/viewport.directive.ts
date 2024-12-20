import { Directive, Renderer2, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appViewport]',
})
export class ViewportDirective implements OnInit {
  private lastViewportHeight: number = 0;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setViewportDimensions();

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', () => {
        this.setViewportDimensions();
        this.scrollInputIntoView();
      });
    }
  }

  private setViewportDimensions(): void {
    const visualHeight = window.visualViewport?.height || window.innerHeight;
    const toolbarHeight = window.outerHeight - window.innerHeight;
    const adjustedHeight = visualHeight - Math.max(toolbarHeight, 0);

    // Update vh and vw CSS variables
    const vh = adjustedHeight * 0.01;
    const vw = window.innerWidth * 0.01;

    this.renderer.setStyle(document.documentElement, '--vh', `${vh}px`);
    this.renderer.setStyle(document.documentElement, '--vw', `${vw}px`);

    // Optionally, log changes for debugging
    if (this.lastViewportHeight !== adjustedHeight) {
      console.log('Viewport height adjusted:', adjustedHeight);
      this.lastViewportHeight = adjustedHeight;
    }
  }

  private scrollInputIntoView(): void {
    const activeElement = document.activeElement as HTMLElement;

    if (activeElement && activeElement.tagName === 'INPUT') {
      activeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }
}
