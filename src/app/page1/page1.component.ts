import { Component } from '@angular/core';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss'],
  standalone: false,
})
export class Page1Component {
  itemCount: number = 3;

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
