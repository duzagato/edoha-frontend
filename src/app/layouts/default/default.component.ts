import { Component, signal, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ToastModule } from 'primeng/toast';
import { HeaderComponent } from './components/header/header.component';
import { InstitutionResolverService } from '../../core/services/institution-resolver.service';
import { PanelMenu, PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [RouterModule, ToastModule, HeaderComponent, PanelMenu, PanelMenuModule],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultLayoutComponent {
  @Input() menuItems: MenuItem[] | undefined = undefined;
  private readonly institutionResolver = inject(InstitutionResolverService);

  isHandset = signal(false);
  sidebarOpen = signal(true);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).subscribe((result) => {
      this.isHandset.set(result.matches);
      this.sidebarOpen.set(!result.matches);
    });
  }

  toggleDrawer(): void {
    this.sidebarOpen.update((open) => !open);
  }
}
