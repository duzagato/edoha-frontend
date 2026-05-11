import { Component, inject, output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../../core/services/requests/auth.service';
import { ThemeService } from '../../../../core/services/theme/theme.service';
import { InstitutionPublicDTO } from '../../../../core/models/institution';
import { InstitutionResolverService } from '../../../../core/services/institution-resolver.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, MenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly institutionService = inject(InstitutionResolverService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly themeService = inject(ThemeService);

  menuToggle = output<void>();
  institution: InstitutionPublicDTO | null = null;

  constructor() {
    this.institution = this.institutionService.getFromStorage(this.institutionService.extractSlug());
  }

  get userName(): string {
    return this.authService.getNickname() || 'Usuário';
  }

  get userMenuItems(): MenuItem[] {
    return [
      {
        label: 'Configurações',
        icon: 'pi pi-cog',
        command: () => this.navigateToSettings(),
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  onMenuToggle(): void {
    this.menuToggle.emit();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToSettings(): void {
    this.router.navigate(['/settings']);
  }
}
