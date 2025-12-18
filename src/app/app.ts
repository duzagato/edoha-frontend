import { MatIconModule } from '@angular/material/icon';
import { Component, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material'; // Importante para o Material UI

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  form = new FormGroup({});
  model = { nickname: '', password: '' };
  
  fields: FormlyFieldConfig[] = [
    {
      key: 'nickname',
      type: 'input',
      templateOptions: {
        label: 'Apelido',
        placeholder: 'Apelido',
        required: true,
        type: 'text',
        appearance: 'outline',
        addonRight: {
          icon: 'user_outline',
        },
      },
      validation: {
        messages: {
          required: 'Apelido é obrigatório',
        },
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'Senha',
        placeholder: '********',
        required: true,
        type: 'password',
        appearance: 'outline',
        addonRight: {
          icon: 'vpn_key_outline',
        },
      },
      validation: {
        messages: {
          required: 'Senha é obrigatória',
        },
      },
    },
  ];

  onSubmit(model: any) {
    if (this.form.valid) {
      console.log('Dados do Login:', model);
    }
  }
}