import { Routes } from '@angular/router';
import { LotteryListComponent } from './lottery-list/lottery-list.component';
import { LotteryFormComponent } from './lottery-form/lottery-form.component';

export const lotteryRoutes: Routes = [
  {
    path: '',
    component: LotteryListComponent,
  },
  {
    path: 'new',
    component: LotteryFormComponent,
  },
];
