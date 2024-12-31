import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss'],
  standalone: false,
})
export class Page2Component implements OnInit, OnDestroy {
  itemCount: number = 3;
  innerHeight: number = 0;
  outerHeight: number = 0;

  ngOnInit() {
    this.updateHeights();
    // Update heights when window is resized
    window.addEventListener('resize', () => this.updateHeights());
  }

  ngOnDestroy() {
    // Clean up event listener
    window.removeEventListener('resize', () => this.updateHeights());
  }

  updateHeights() {
    this.innerHeight = window.innerHeight;
    this.outerHeight = window.outerHeight;
  }

  getItems(): number[] {
    return Array.from({ length: this.itemCount }, (_, i) => i + 1);
  }

  incrementCount(): void {
    if (this.itemCount < 100) {
      this.itemCount++;
    }
  }

  decrementCount(): void {
    if (this.itemCount > 1) {
      this.itemCount--;
    }
  }
}
