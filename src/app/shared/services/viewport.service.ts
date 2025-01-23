import { Injectable } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { BehaviorSubject, fromEvent, merge } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

interface ViewportDimensions {
  vw: number;
  vh: number;
  isKeyboardVisible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ViewportService {
  private dimensions$ = new BehaviorSubject<ViewportDimensions>(this.calculateDimensions());

  constructor(private viewportRuler: ViewportRuler) {
    this.setupViewportObserver();
  }

  getDimensions$() {
    return this.dimensions$.asObservable().pipe(
      distinctUntilChanged((prev, curr) => 
        prev.vh === curr.vh && 
        prev.vw === curr.vw && 
        prev.isKeyboardVisible === curr.isKeyboardVisible
      )
    );
  }

  private calculateDimensions(): ViewportDimensions {
    const { width, height } = this.viewportRuler.getViewportSize();
    const vw = width * 0.01;
    let vh: number;
    let isKeyboardVisible = false;

    if (window.visualViewport) {
      const innerHeightVh = window.innerHeight * 0.01;
      const visualViewportVh = window.visualViewport.height * 0.01;
      const offsetY = window.visualViewport.offsetTop;

      isKeyboardVisible = false;
      vh = visualViewportVh ;
    } else {
      vh = window.innerHeight * 0.01;
    }

    return { vw, vh, isKeyboardVisible };
  }

  private setupViewportObserver(): void {
    this.viewportRuler.change()
      .subscribe(() => this.dimensions$.next(this.calculateDimensions()));

    // if (window.visualViewport) {
    //   fromEvent(window.visualViewport, 'resize')
    //     .subscribe(() => this.dimensions$.next(this.calculateDimensions()));
    // } else {
    //   const events = ['resize', 'orientationchange'];
    //   merge(...events.map(event => fromEvent(window, event)))
    //     .subscribe(() => this.dimensions$.next(this.calculateDimensions()));
    // }
  }
} 