import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewportService } from '../../services/viewport.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewportRuler } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  private destroy$ = new Subject<void>();

  constructor(private viewportRuler: ViewportRuler){
    this.viewportRuler.change()
    .subscribe(() => this.calculateDimensions());
  }

  ngOnInit() {


   this.calculateDimensions();

      };
      private calculateDimensions(){
        const vh = window.innerHeight * 0.01;
        const vw = window.innerWidth * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--vw', `${vw}px`);
      }
  }


