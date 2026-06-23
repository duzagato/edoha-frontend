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
  menuItems: MenuItem[] = [];

  constructor() {
    this.institutionService.getInstitution(this.institutionService.extractSlug()).subscribe({
      next: (data) => {
        this.institution = data;
      },
    });
  }

  ngOnInit(): void {
    this.menuItems = this.getMenuItems();
  }

  getMenuItems(): MenuItem[] {
    return [
      {
        label: 'Início',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Usuários',
        icon: 'pi pi-users',
        routerLink: '/usuarios/gerenciar'
      },
      {
        label: 'Rifas',
        icon: 'pi pi-ticket',
        routerLink: '/rifas/gerenciar' 
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
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

  navigateToRoute(routeName: string): void {
    this.router.navigate([routeName]);
  }
}
