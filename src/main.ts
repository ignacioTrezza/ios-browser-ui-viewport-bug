import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Adjust --vh custom property on window resize
function setVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Initial setting
setVh();

// Update on resize
window.addEventListener('resize', setVh);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
