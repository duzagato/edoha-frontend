import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, take } from 'rxjs';
import { InstitutionService } from './requests/institution.service';
import { InstitutionPublicDTO } from '../models/institution';
import { CacheKeys } from '../../shared/constants/cache-keys';

@Injectable({ providedIn: 'root' })
export class InstitutionResolverService {
  private readonly router = inject(Router);
  private readonly institutionService = inject(InstitutionService);

  init(): void {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const slug = this.extractSlug();
      if (this.getFromStorage(slug)) return;

      this.institutionService
        .getBySlug(slug)
        .pipe(take(1))
        .subscribe(institution => {
          sessionStorage.setItem(
            `${CacheKeys.INSTITUTION_STORAGE_PREFIX}.${slug}`,
            JSON.stringify(institution),
          );
        });
    });
  }

  extractSlug(): string {
    const hostname = window.location.hostname;
    const match = hostname.match(/^(.+)\.edoha\./i);
    if (!match) return 'edoha';
    const subdomain = match[1].replace(/^www\./i, '');
    return subdomain || 'edoha';
  }

  getFromStorage(slug: string): InstitutionPublicDTO | null {
    const raw = sessionStorage.getItem(`${CacheKeys.INSTITUTION_STORAGE_PREFIX}.${slug}`);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as InstitutionPublicDTO;
    } catch {
      return null;
    }
  }
}
