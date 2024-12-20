import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

// Adjust --vh custom property on window resize
function setVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Initial setting
setVh();

// Update on resize
window.addEventListener('resize', setVh);

bootstrapApplication(AppComponent, {
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
  .catch(err => console.error(err));
