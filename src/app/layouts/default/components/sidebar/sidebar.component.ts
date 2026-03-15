import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanelMenu, PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem, MessageService } from 'primeng/api';
import { getMenuItems } from '../../../../shared/constants/menu-options';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, PanelMenu, PanelMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  menuItems = signal<MenuItem[]>([]);

  ngOnInit(): void {
    this.menuItems.set(getMenuItems());
  }
}
