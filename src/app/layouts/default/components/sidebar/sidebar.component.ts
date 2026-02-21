import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

import { LotteryMockService } from '../../../../core/services/lottery-mock.service';
import { LotteryDTO } from '../../../../core/models/lottery';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, PanelMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  private readonly lotteryMockService = inject(LotteryMockService);

  menuItems = signal<MenuItem[]>([]);

  ngOnInit(): void {
    this.loadLotteries();
  }

  private loadLotteries(): void {
    this.lotteryMockService.getAllLotteries().subscribe({
      next: (lotteries) => {
        this.buildMenuItems(lotteries);
      },
    });
  }

  private buildMenuItems(lotteries: LotteryDTO[]): void {
    const items: MenuItem[] = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Usuário',
        icon: 'pi pi-user',
        items: [
          { label: 'Gerenciar Usuários', icon: 'pi pi-users', routerLink: '/usuarios/gerenciar' },
          { label: 'Adicionar Usuário', icon: 'pi pi-user-plus', routerLink: '/usuarios/adicionar' },
        ],
      },
      {
        label: 'Rifa',
        icon: 'pi pi-ticket',
        items: [
          { label: 'Gerenciar Rifas', icon: 'pi pi-list', routerLink: '/rifas/gerenciar' },
          { label: 'Adicionar Rifa', icon: 'pi pi-plus-circle', routerLink: '/rifas/adicionar' },
        ],
      },
      ...lotteries.map((lottery) => ({
        label: lottery.name,
        icon: 'pi pi-ticket',
        items: [
          { label: 'Resumo', icon: 'pi pi-chart-bar', routerLink: `/rifas/${lottery.id}/resumo` },
          { label: 'Gerenciar', icon: 'pi pi-cog', routerLink: `/rifas/${lottery.id}/gerenciar` },
          { label: 'Retirada de talão', icon: 'pi pi-download', routerLink: `/rifas/${lottery.id}/retirada` },
          { label: 'Venda de Número', icon: 'pi pi-tag', routerLink: `/rifas/${lottery.id}/venda` },
        ],
      })),
    ];

    this.menuItems.set(items);
  }
}
