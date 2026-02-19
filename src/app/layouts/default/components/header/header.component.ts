import { Component, inject, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/requests/auth.service';
import { ThemeService } from '../../../../core/services/theme/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly themeService = inject(ThemeService);

  menuToggle = output<void>();
  
  // User menu dropdown state
  userMenuOpen = signal(false);

  get userName(): string {
    return this.authService.getNickname() || 'Usuário';
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  onMenuToggle(): void {
    this.menuToggle.emit();
  }

  toggleUserMenu(): void {
    this.userMenuOpen.set(!this.userMenuOpen());
  }

  closeUserMenu(): void {
    this.userMenuOpen.set(false);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.closeUserMenu();
  }

  navigateToSettings(): void {
    this.router.navigate(['/settings']);
    this.closeUserMenu();
  }
}
