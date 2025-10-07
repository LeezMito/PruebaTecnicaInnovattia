import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { loadingInterceptor } from './app/core/interceptor/loading.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

var appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(),withInterceptors([loadingInterceptor])),
    provideCharts(withDefaultRegisterables()), 
    provideAnimations(), 
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      closeButton: true,
      progressBar: true,
      preventDuplicates: true,
    }),
  ]
}
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
