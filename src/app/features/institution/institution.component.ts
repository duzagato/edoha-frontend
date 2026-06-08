import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InstitutionService } from '../../core/services/requests/institution.service';
import { AuthService } from '../../core/services/requests/auth.service';
import { CacheKeys } from '../../shared/constants/cache-keys';
import { InstitutionDTO } from '../../core/models/institution';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-institution',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './institution.component.html',
  styleUrl: './institution.component.scss',
})
export class InstitutionComponent implements OnInit {
  institutions: InstitutionDTO[] = [];
  loading = true;

  constructor(
    private readonly institutionService: InstitutionService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    const idUser = this.authService.getIdUser();

    if (!idUser) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return;
    }

    this.institutions = JSON.parse(sessionStorage.getItem(CacheKeys.USER_STORAGE_PREFIX + ':institutions')!);

    if(this.institutions == null){
      console.log("Não possui cache");
      this.institutionService.getByUser(idUser).subscribe({
        next: (institutions) => {
          this.institutions = institutions ?? [];
        },
        error: () => {
          this.institutions = [];
          this.loading = false;
        },
      });
    }

    this.loading = false;
    if (this.institutions.length === 1) {
      this.selectInstitution(this.institutions[0]);
    }
  }

  selectInstitution(institution: InstitutionDTO): void {
    localStorage.setItem(CacheKeys.ID_INSTITUTION, institution.id);
    this.router.navigate(['/']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
