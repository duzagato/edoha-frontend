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
    
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
    } else {
      htmlElement.classList.add('light');
      htmlElement.classList.remove('dark');
    }
    
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

  /**
   * Force a specific theme temporarily (e.g., for login page)
   * Stores current theme to restore later
   */
  private _forcedTheme: Theme | null = null;
  
  public forceTheme(theme: Theme): void {
    if (!this._forcedTheme) {
      this._forcedTheme = this._currentTheme();
    }
    this._currentTheme.set(theme);
  }

  /**
   * Restore the previously saved theme before forcing
   */
  public restoreTheme(): void {
    if (this._forcedTheme) {
      this._currentTheme.set(this._forcedTheme);
      this._forcedTheme = null;
    }
  }
}
