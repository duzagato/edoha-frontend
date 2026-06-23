import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})

export class StringService {
  getSlug(text: any): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}