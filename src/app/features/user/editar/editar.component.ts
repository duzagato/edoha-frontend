import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../../core/services/requests/user.service';
import { UpdateUserDTO, UserDTO } from '../../../core/models/user';

interface EditUserFormModel {
  name: string;
  nickname: string | null;
  phone: string | null;
  idUserType: string;
}

@Component({
  selector: 'app-editar-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.scss',
})
export class EditarComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);

  form = new FormGroup({});
  model: EditUserFormModel = {
    name: '',
    nickname: null,
    phone: null,
    idUserType: '',
  };
  loading = signal<boolean>(false);
  userId: string = '';

  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      props: {
        label: 'Nome',
        placeholder: 'Digite o nome completo',
        required: true,
        appearance: 'outline',
      },
      validation: {
        messages: {
          required: 'Nome é obrigatório',
        },
      },
    },
    {
      key: 'nickname',
      type: 'input',
      props: {
        label: 'Apelido',
        placeholder: 'Digite o apelido',
        required: false,
        appearance: 'outline',
      },
    },
    {
      key: 'phone',
      type: 'input',
      props: {
        label: 'Telefone',
        placeholder: '(00) 00000-0000',
        required: false,
        appearance: 'outline',
      },
    },
    {
      key: 'idUserType',
      type: 'input',
      props: {
        label: 'ID Tipo de Usuário',
        placeholder: 'Digite o ID do tipo de usuário',
        required: true,
        appearance: 'outline',
      },
      validation: {
        messages: {
          required: 'ID do tipo de usuário é obrigatório',
        },
      },
    },
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = id;
      this.loadUser(id);
    } else {
      this.snackBar.open('ID do usuário não encontrado', 'Fechar', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
      this.router.navigate(['/usuarios/gerenciar']);
    }
  }

  loadUser(id: string): void {
    this.loading.set(true);
    this.userService.getById(id).subscribe({
      next: (user) => {
        this.model = {
          name: user.name,
          nickname: user.nickname,
          phone: user.phone,
          idUserType: user.idUserType,
        };
        this.loading.set(false);
      },
      error: (error) => {
        const errorMessage = error?.error?.message || 'Erro ao carregar usuário';
        this.snackBar.open(errorMessage, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
        this.loading.set(false);
        this.router.navigate(['/usuarios/gerenciar']);
      },
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updateData: UpdateUserDTO = {
        id: this.userId,
        name: this.model.name,
        nickname: this.model.nickname,
        phone: this.model.phone ?? undefined,
        idUserType: this.model.idUserType,
      };

      this.userService.update(updateData).subscribe({
        next: () => {
          this.snackBar.open('Usuário atualizado com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate(['/usuarios/gerenciar']);
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'Erro ao atualizar usuário';
          this.snackBar.open(errorMessage, 'Fechar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/usuarios/gerenciar']);
  }
}
