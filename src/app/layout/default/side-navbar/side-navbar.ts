import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-navbar',
  standalone: false,
  templateUrl: './side-navbar.html',
  styleUrl: './side-navbar.scss'
})
export class SideNavbar {
  openSubmenu: string | null = null;

  toggleSubmenu(submenuId: string): void {
    if (this.openSubmenu === submenuId) {
      this.openSubmenu = null;
    } else {
      this.openSubmenu = submenuId;
    }
  }
}
