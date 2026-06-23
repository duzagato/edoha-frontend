import { Component, signal } from '@angular/core';
import { LotteryService } from '../../core/services/requests/';
import { Lottery } from '../../core/models/lottery/lottery.dto';
import { MenuItem } from 'primeng/api';
import { StringService } from "../../shared/services/string.service";
import { DefaultLayoutComponent } from '../default/default.component';

@Component({
  selector: 'app-lottery-layout',
  imports: [DefaultLayoutComponent],
  templateUrl: './lottery-layout.html',
  styleUrl: './lottery-layout.scss',
})
export class LotteryLayout {
  lotteries: Lottery[] = [];
  menuItems = signal<MenuItem[]>([]);
  
  constructor(public lotteryService: LotteryService, private stringService: StringService) {}

  ngOnInit() {
    this.lotteryService.getLotteriesByInstitution().subscribe((lotteries) => {
      this.menuItems.set(this.createMenuItems(lotteries));
    });
  }

  createMenuItems(lotteries: Lottery[]): MenuItem[] {
    if (!lotteries || lotteries.length === 0) {
      return [];
    }
    
    return lotteries.map((lottery) => ({
      label: lottery.name,
      icon: 'pi pi-fw pi-ticket',
      items: this.createSubmenuItems(this.stringService.getSlug(lottery.name))
    }));
  }

  createSubmenuItems(slug: string): MenuItem[] {
    return [
      {
          label: 'Resumo',
          icon: 'pi pi-table',
          routerLink: `/rifas/${slug}/resumo`
        },
        {
          label: 'Gerenciar',
          icon: 'pi pi-wrench',
          routerLink: `/rifas/${slug}/gerenciar`
        },
        {
          label: 'Retirada de Talão',
          icon: 'pi pi-ticket',
          routerLink: `/rifas/${slug}/talao/retirada`
        },
        {
          label: 'Devolução de Talão',
          icon: 'pi pi-ticket',
          routerLink: `/rifas/${slug}/talao/devolucao`
        },
        {
          label: 'Venda de Número',
          icon: 'pi pi-tag',
          routerLink: `/rifas/${slug}/venda`
        }
    ]
  }
}
