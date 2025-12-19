import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to dark theme on first load', () => {
    expect(service.currentTheme()).toBe('dark');
    expect(localStorage.getItem('theme-mode')).toBe('dark');
  });

  it('should set data-theme attribute on document element', () => {
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should toggle theme from dark to light', () => {
    service.toggleTheme();
    expect(service.currentTheme()).toBe('light');
    expect(localStorage.getItem('theme-mode')).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should toggle theme from light to dark', () => {
    service.setTheme('light');
    service.toggleTheme();
    expect(service.currentTheme()).toBe('dark');
    expect(localStorage.getItem('theme-mode')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should set specific theme', () => {
    service.setTheme('light');
    expect(service.currentTheme()).toBe('light');
    expect(localStorage.getItem('theme-mode')).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should persist theme in localStorage', () => {
    service.setTheme('light');
    expect(localStorage.getItem('theme-mode')).toBe('light');
    
    service.setTheme('dark');
    expect(localStorage.getItem('theme-mode')).toBe('dark');
  });

  it('should read existing theme from localStorage', () => {
    localStorage.clear();
    localStorage.setItem('theme-mode', 'light');
    
    const newService = TestBed.inject(ThemeService);
    expect(newService.currentTheme()).toBe('light');
  });

  it('should expose currentTheme as readonly signal', () => {
    const theme = service.currentTheme;
    expect(typeof theme).toBe('function');
    expect(theme()).toBe('dark');
    
    // Verify it's readonly by checking it doesn't have set method
    expect((theme as any).set).toBeUndefined();
  });
});
