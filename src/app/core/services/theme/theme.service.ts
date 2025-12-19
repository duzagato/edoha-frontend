import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_STORAGE_KEY = 'theme-mode';
  private readonly DEFAULT_THEME: Theme = 'dark';

  private _currentTheme = signal<Theme>(this.getInitialTheme());

  public readonly currentTheme = this._currentTheme.asReadonly();

  constructor() {
    // Apply theme whenever it changes
    effect(() => {
      const theme = this._currentTheme();
      this.applyTheme(theme);
    });
  }

  private getInitialTheme(): Theme {
    const storedTheme = localStorage.getItem(this.THEME_STORAGE_KEY) as Theme | null;
    
    if (!storedTheme) {
      // First time user - set default theme
      localStorage.setItem(this.THEME_STORAGE_KEY, this.DEFAULT_THEME);
      return this.DEFAULT_THEME;
    }
    
    return storedTheme;
  }

  private applyTheme(theme: Theme): void {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.THEME_STORAGE_KEY, theme);
  }

  public toggleTheme(): void {
    const newTheme = this._currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  public setTheme(theme: Theme): void {
    this._currentTheme.set(theme);
  }
}
