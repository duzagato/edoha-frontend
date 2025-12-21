import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../../core/services/requests/user.service';
import { CreateUserDTO, UpdateUserDTO } from '../../../core/models/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);

  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];
  loading = signal(false);
  isEditMode = signal(false);
  userId: string | null = null;

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.isEditMode.set(!!this.userId);

    this.initializeFields();

    if (this.isEditMode() && this.userId) {
      this.loadUser(this.userId);
    }
  }

  initializeFields(): void {
    this.fields = [
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
          required: !this.isEditMode(),
          type: 'password',
          appearance: 'outline',
        },
        validation: {
          messages: {
            required: 'Senha é obrigatória',
          },
        },
        expressions: {
          'props.required': () => !this.isEditMode(),
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
        this.snackBar.open('Erro ao carregar usuário', 'Fechar', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
        this.loading.set(false);
        this.router.navigate(['/users']);
      },
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading.set(true);

      if (this.isEditMode() && this.userId) {
        const updateData: UpdateUserDTO = {
          name: this.model.name,
          nickname: this.model.nickname,
          phone: this.model.phone,
          idUserType: this.model.idUserType,
        };

        this.userService.update(updateData).subscribe({
          next: () => {
            this.snackBar.open('Usuário atualizado com sucesso!', 'Fechar', {
              duration: 3000,
            });
            this.router.navigate(['/users']);
          },
          error: (error) => {
            const errorMessage = error?.error?.message || 'Erro ao atualizar usuário';
            this.snackBar.open(errorMessage, 'Fechar', {
              duration: 5000,
              panelClass: ['error-snackbar'],
            });
            this.loading.set(false);
          },
        });
      } else {
        const createData: CreateUserDTO = {
          name: this.model.name,
          nickname: this.model.nickname,
          phone: this.model.phone,
          unhashedPassword: this.model.unhashedPassword,
          idUserType: this.model.idUserType,
        };

        this.userService.create(createData).subscribe({
          next: () => {
            this.snackBar.open('Usuário criado com sucesso!', 'Fechar', {
              duration: 3000,
            });
            this.router.navigate(['/users']);
          },
          error: (error) => {
            const errorMessage = error?.error?.message || 'Erro ao criar usuário';
            this.snackBar.open(errorMessage, 'Fechar', {
              duration: 5000,
              panelClass: ['error-snackbar'],
            });
            this.loading.set(false);
          },
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}
