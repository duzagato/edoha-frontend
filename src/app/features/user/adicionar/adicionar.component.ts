import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../../core/services/requests/user.service';
import { CreateUserDTO } from '../../../core/models/user';

@Component({
  selector: 'app-adicionar-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './adicionar.component.html',
  styleUrl: './adicionar.component.scss',
})
export class AdicionarComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  form = new FormGroup({});
  model: CreateUserDTO = {
    name: '',
    phone: '',
    idUserType: '',
  };

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
        required: true,
        appearance: 'outline',
      },
      validation: {
        messages: {
          required: 'Apelido é obrigatório',
        },
      },
    },
    {
      key: 'phone',
      type: 'input',
      props: {
        label: 'Telefone',
        placeholder: '(00) 00000-0000',
        required: true,
        appearance: 'outline',
      },
      validation: {
        messages: {
          required: 'Telefone é obrigatório',
        },
      },
    },
    {
      key: 'unhashedPassword',
      type: 'input',
      props: {
        label: 'Senha',
        placeholder: '********',
        required: true,
        type: 'password',
        appearance: 'outline',
      },
      validation: {
        messages: {
          required: 'Senha é obrigatória',
        },
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

  onSubmit(): void {
    if (this.form.valid) {
      this.userService.create(this.model).subscribe({
        next: () => {
          this.snackBar.open('Usuário criado com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate(['/usuarios/gerenciar']);
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'Erro ao criar usuário';
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
