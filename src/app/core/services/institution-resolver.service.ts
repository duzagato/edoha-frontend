import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Observable, take, of, tap } from 'rxjs';
import { InstitutionService } from './requests/institution.service';
import { InstitutionPublicDTO } from '../models/institution';
import { CacheKeys, SessionKeys } from '../../shared/constants/cache-keys';

@Injectable({ providedIn: 'root' })
export class InstitutionResolverService {
  private readonly router = inject(Router);
  private readonly institutionService = inject(InstitutionService);

  init(): void {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const slug = this.extractSlug();
      this.getInstitution(slug).subscribe({
        next: (data) => {
          if (data) {
            this.defineSession(data);
          }

          return;
        },
      });
      this.getFromApi(slug).subscribe({
        next: (response) => {
          if (response) {
            sessionStorage.setItem(`${CacheKeys.INSTITUTION_STORAGE_PREFIX}.${slug}`, JSON.stringify(response));
            sessionStorage.setItem(SessionKeys.INSTITUTION_SLUG, slug);
            sessionStorage.setItem(SessionKeys.INSTITUTION_ID, response.id.toString());
            sessionStorage.setItem(SessionKeys.INSTITUTION_SHORT_NAME, response.shortName);
          }
        },
        error: () => {
          sessionStorage.removeItem(`${CacheKeys.INSTITUTION_STORAGE_PREFIX}.${slug}`);
        },
      });
    });
  }

  extractSlug(): string {
    const hostname = window.location.hostname;
    const match = hostname.match(/^(.+)\.edoha\./i);
    if (!match) return 'adevirp';
    const subdomain = match[1].replace(/^www\./i, '');
    return subdomain || 'edoha';
  }

getInstitution(slug: string): Observable<InstitutionPublicDTO | null> {
    const raw = sessionStorage.getItem(`${CacheKeys.INSTITUTION_STORAGE_PREFIX}.${slug}`);
    
    if (raw) {
      try {
        const data = JSON.parse(raw) as InstitutionPublicDTO;
        return of(data);
      } catch {
        // Se o JSON estiver corrompido, limpa e deixa seguir para buscar na API
        sessionStorage.removeItem(`${CacheKeys.INSTITUTION_STORAGE_PREFIX}.${slug}`);
      }
    }

    return this.getFromApi(slug).pipe(
      tap(data => {
        if (data) {
          sessionStorage.setItem(`${CacheKeys.INSTITUTION_STORAGE_PREFIX}.${slug}`, JSON.stringify(data));
        }
      })
    );
  }

  defineSession(institution: InstitutionPublicDTO): void {
    sessionStorage.setItem(SessionKeys.INSTITUTION_SLUG, institution.slugName);
    sessionStorage.setItem(SessionKeys.INSTITUTION_ID, institution.id.toString());
    sessionStorage.setItem(SessionKeys.INSTITUTION_SHORT_NAME, institution.shortName);
  }

  getFromApi(slug: string): Observable<InstitutionPublicDTO> {
    return this.institutionService.getBySlug(slug).pipe(take(1));
  }
}
