import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const CoreProviders = [
    // se precisar importar módulos clássicos:
    importProvidersFrom(BrowserAnimationsModule),

    // exemplo de token de configuração
    //   { provide: API_BASE_URL, useValue: 'https://api.suaempresa.com' },

    // interceptor de autenticação
    //   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];