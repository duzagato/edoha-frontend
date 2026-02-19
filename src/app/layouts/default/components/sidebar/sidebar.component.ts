import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LotteryService } from '../../../../core/services/requests/lottery.service';
import { LotteryDTO } from '../../../../core/models/lottery';

interface MenuItem {
  title: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuItems = signal<MenuItem[]>([]);
  private lotterySubscription?: Subscription;

  constructor(private readonly lotteryService: LotteryService) {}

  ngOnInit(): void {
    this.initializeMenu();
  }

  ngOnDestroy(): void {
    this.lotterySubscription?.unsubscribe();
  }

  toggleMenuItem(item: MenuItem): void {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }

  private initializeMenu(): void {
    this.menuItems.set([
      {
        title: 'Home',
        icon: 'home',
        route: '/',
      },
      {
        title: 'Usuário',
        icon: 'person',
        expanded: false,
        children: [
          { title: 'Gerenciar Usuários', icon: 'manage_accounts', route: '/usuarios/gerenciar' },
          { title: 'Adicionar Usuário', icon: 'person_add', route: '/usuarios/adicionar' },
        ],
      },
      {
        title: 'Rifa',
        icon: 'confirmation_number',
        expanded: false,
        children: [
          { title: 'Gerenciar Rifas', icon: 'list', route: '/rifas/gerenciar' },
          { title: 'Adicionar Rifa', icon: 'add_circle', route: '/rifas/adicionar' },
        ],
      },
    ]);

    this.loadLotteries();
  }

  private loadLotteries(): void {
    this.lotterySubscription = this.lotteryService.getAll().subscribe({
      next: (lotteries: LotteryDTO[]) => {
        const lotteryMenuItems = this.createLotteryMenuItems(lotteries);
        this.menuItems.update(currentItems => [...currentItems, ...lotteryMenuItems]);
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
      expanded: false,
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

  getIconSvg(iconName: string): string {
    const icons: { [key: string]: string } = {
      'home': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />',
      'person': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />',
      'manage_accounts': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />',
      'person_add': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />',
      'confirmation_number': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />',
      'list': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />',
      'add_circle': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />',
      'summarize': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />',
      'receipt_long': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />',
      'tag': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />',
      'assignment_return': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />',
      'assignment_returned': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6-6m6 6l-6 6" />',
      'sell': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
      'point_of_sale': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />',
    };
    return icons[iconName] || icons['home'];
  }
}
