import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { LotteryService } from '../../../../core/services/requests/lottery.service';
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
  menuItems: MenuItem[] = [];

  constructor(private readonly lotteryService: LotteryService) {}

  ngOnInit(): void {
    this.initializeMenu();
    this.loadLotteries();
  }

  private initializeMenu(): void {
    this.menuItems = [
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

  private loadLotteries(): void {
    this.lotteryService.getAll().subscribe({
      next: (lotteries: LotteryDTO[]) => {
        const lotteryMenuItems = this.createLotteryMenuItems(lotteries);
        this.menuItems = [...this.menuItems, ...lotteryMenuItems];
      },
      error: (error) => {
        console.error('Error loading lotteries:', error);
      }
    });
  }

  private createLotteryMenuItems(lotteries: LotteryDTO[]): MenuItem[] {
    return lotteries.map((lottery) => ({
      title: lottery.name,
      icon: 'confirmation_number',
      children: [
        { title: 'Resumo', icon: 'summarize', route: `/rifas/${lottery.id}/resumo` },
        { title: 'Gerenciar Talões', icon: 'receipt_long', route: `/rifas/${lottery.id}/gerenciar-taloes` },
        { title: 'Gerenciar Números', icon: 'tag', route: `/rifas/${lottery.id}/gerenciar-numeros` },
        { title: 'Retirada de Talão', icon: 'assignment_return', route: `/rifas/${lottery.id}/retirada-talao` },
        { title: 'Devolução de Talão', icon: 'assignment_returned', route: `/rifas/${lottery.id}/devolucao-talao` },
        { title: 'Venda de Número', icon: 'sell', route: `/rifas/${lottery.id}/venda-numero` },
        { title: 'Venda de Talão', icon: 'point_of_sale', route: `/rifas/${lottery.id}/venda-talao` },
      ],
    }));
  }
}
