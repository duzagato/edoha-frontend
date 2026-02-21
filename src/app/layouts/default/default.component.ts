import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ToastModule } from 'primeng/toast';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [RouterModule, ToastModule, SidebarComponent, HeaderComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultLayoutComponent {
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
