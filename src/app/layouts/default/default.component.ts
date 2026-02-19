import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [RouterModule, SidebarComponent, HeaderComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultLayoutComponent {
  isHandset = signal(false);
  isSidebarOpen = signal(false);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).subscribe((result) => {
      this.isHandset.set(result.matches);
      // Automatically close sidebar on mobile
      if (result.matches) {
        this.isSidebarOpen.set(false);
      }
    });
  }

  toggleDrawer(): void {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }
}
