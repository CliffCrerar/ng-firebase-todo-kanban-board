import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) enableProdMode();

environment.production
  ? console.log("%c PROD ENVIRONMENT", "color: red")
  : console.log("%c DEV ENVIRONMENT", "color: dodgerblue")


platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
