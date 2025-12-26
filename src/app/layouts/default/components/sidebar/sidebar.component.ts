import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { LotteryMockService } from '../../../../core/services/lottery-mock.service';
import { LotteryDTO } from '../../../../core/models/lottery';

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
export class SidebarComponent implements OnInit {
  private readonly lotteryMockService = inject(LotteryMockService);

  menuItems = signal<MenuItem[]>([]);
  lotteries = signal<LotteryDTO[]>([]);

  ngOnInit(): void {
    this.loadLotteries();
  }

  private loadLotteries(): void {
    this.lotteryMockService.getAllLotteries().subscribe({
      next: (lotteries) => {
        this.lotteries.set(lotteries);
        this.buildMenuItems(lotteries);
      },
    });
  }

  private buildMenuItems(lotteries: LotteryDTO[]): void {
    const baseMenuItems: MenuItem[] = [
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

    // Add dynamic lottery menu items after the main Rifa menu
    const lotteryMenuItems: MenuItem[] = lotteries.map((lottery) => ({
      title: lottery.name,
      icon: 'confirmation_number',
      children: [
        { title: 'Resumo', icon: 'dashboard', route: `/rifas/${lottery.id}/resumo` },
        { title: 'Gerenciar', icon: 'settings', route: `/rifas/${lottery.id}/gerenciar` },
        { title: 'Retirada de talão', icon: 'file_download', route: `/rifas/${lottery.id}/retirada` },
        { title: 'Venda de Número', icon: 'sell', route: `/rifas/${lottery.id}/venda` },
      ],
    }));

    this.menuItems.set([...baseMenuItems, ...lotteryMenuItems]);
  }
}
