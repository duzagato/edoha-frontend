import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ToastComponent } from '../../shared/components/toast/toast.component';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, HeaderComponent, ToastComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultLayoutComponent {
  isHandset = signal(false);
  drawerOpen = signal(false);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).subscribe((result) => {
      this.isHandset.set(result.matches);
      // Auto-close drawer on mobile when route changes
      if (result.matches) {
        this.drawerOpen.set(false);
      } else {
        this.drawerOpen.set(true);
      }
    });
  }

  toggleDrawer(): void {
    this.drawerOpen.set(!this.drawerOpen());
  }
}
