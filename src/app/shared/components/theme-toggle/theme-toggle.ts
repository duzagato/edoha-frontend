import { Component } from '@angular/core';
import { ThemeService } from './../../../core/services/theme/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss'
})
export class ThemeToggleComponent {
  isChecked: boolean;

  constructor(public themeService: ThemeService) {
    this.isChecked = this.getIsChecked();
  }

  toggle() {
    this.themeService.toggleTheme();
  }

  getIsChecked(){
    const theme = this.themeService.getTheme();

    if(theme === 'dark'){
      return true;
    }else{
      return false;
    }
  }
}
