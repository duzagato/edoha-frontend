import { Component, signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [RouterModule, MatSidenavModule, SidebarComponent, HeaderComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultLayoutComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  isHandset = signal(false);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).subscribe((result) => {
      this.isHandset.set(result.matches);
    });
  }

  toggleDrawer(): void {
    this.drawer.toggle();
  }
}
