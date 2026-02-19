import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_STORAGE_KEY = 'theme-mode';
  private readonly DEFAULT_THEME: Theme = 'dark';
  private savedTheme: Theme | null = null;

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
    
    // Remove both classes first
    htmlElement.classList.remove('light', 'dark');
    
    // Add the current theme class (Tailwind uses 'dark' class for dark mode)
    htmlElement.classList.add(theme);
    
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
   * Temporarily force a theme without affecting the saved preference.
   * Used for pages like login that need to force a specific theme.
   */
  public forceTheme(theme: Theme): void {
    // Save current theme if not already saved
    if (this.savedTheme === null) {
      this.savedTheme = this._currentTheme();
    }
    
    // Apply the forced theme
    const htmlElement = document.documentElement;
    htmlElement.classList.remove('light', 'dark');
    htmlElement.classList.add(theme);
  }

  /**
   * Restore the previously saved theme.
   * Used to restore user's preference after forcing a theme.
   */
  public restoreTheme(): void {
    if (this.savedTheme !== null) {
      this.setTheme(this.savedTheme);
      this.savedTheme = null;
    }
  }
}
