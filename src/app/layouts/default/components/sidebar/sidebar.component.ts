import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

interface MenuItem {
  title: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    {
      title: 'Home',
      icon: 'home',
      route: '/',
    },
    {
      title: 'Usuário',
      icon: 'person',
      children: [
        { title: 'Gerenciar Usuários', icon: 'manage_accounts', route: '/usuarios/gerenciar' },
        { title: 'Adicionar Usuário', icon: 'person_add', route: '/usuarios/adicionar' },
      ],
    },
    {
      title: 'Rifa',
      icon: 'confirmation_number',
      children: [
        { title: 'Gerenciar Rifas', icon: 'list', route: '/rifas/gerenciar' },
        { title: 'Adicionar Rifa', icon: 'add_circle', route: '/rifas/adicionar' },
      ],
    },
  ];
}
