import { Component } from '@angular/core';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss'],
  standalone: false,
})
export class Page2Component {
  itemCountt: number = 3;

  getItems(): number[] {
    return Array.from({ length: this.itemCountt }, (_, i) => i + 1);
  }

  incrementCount(): void {
    if (this.itemCountt < 100) {
      this.itemCountt++;
    }
  }

  decrementCount(): void {
    if (this.itemCountt > 1) {
      this.itemCountt--;
    }
  }
}
