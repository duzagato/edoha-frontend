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
      title: 'Usuário',
      icon: 'person',
      children: [
        { title: 'Gerenciar Usuários', icon: 'manage_accounts', route: '/users' },
        { title: 'Adicionar Usuário', icon: 'person_add', route: '/users/new' },
        { title: 'Perfis e Permissões', icon: 'security', route: '/users/permissions' },
      ],
    },
    {
      title: 'Rifa',
      icon: 'confirmation_number',
      children: [
        { title: 'Gerenciar Rifas', icon: 'list', route: '/lotteries' },
        { title: 'Nova Rifa', icon: 'add_circle', route: '/lotteries/new' },
        { title: 'Sorteios', icon: 'emoji_events', route: '/lotteries/draws' },
        { title: 'Relatórios', icon: 'assessment', route: '/lotteries/reports' },
      ],
    },
    {
      title: 'Instituições',
      icon: 'business',
      children: [
        { title: 'Gerenciar Instituições', icon: 'business_center', route: '/institutions' },
        { title: 'Nova Instituição', icon: 'add_business', route: '/institutions/new' },
        { title: 'Configurações', icon: 'settings', route: '/institutions/settings' },
      ],
    },
  ];
}
