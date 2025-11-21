import { DynamicFormConfig } from "./form-fields.config"; // Certifique-se de que o nome do arquivo de interfaces está correto

export const USER_FORM_CONFIG: DynamicFormConfig = {
  globalConfig: {
    submitButtonText: 'Adicionar', // Configuração Global
    submitButtonIcon: 'add',         // Configuração Global
  },
  fields: [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      initialValue: '',
      fieldsGroup: null, // Alterado para 'fieldsGroup' e definido como null
      placeholder: 'Seu nome completo',
      validators: [
        { name: 'required', message: 'O nome é obrigatório.' }
      ]
    },
    {
      name: 'phone',
      label: 'Telefone',
      type: 'text',
      initialValue: '',
      fieldsGroup: null, // Alterado para 'fieldsGroup' e definido como null
      placeholder: '(XX) XXXXX-XXXX',
      validators: []
    },
    {
      name: 'nickname',
      label: 'Apelido',
      type: 'text',
      initialValue: '',
      fieldsGroup: null, // Alterado para 'fieldsGroup' e definido como null
      placeholder: 'Apelido (ex: Joãozito)',
      validators: []
    },
    {
      name: 'password',
      label: 'Senha',
      type: 'password',
      initialValue: '',
      fieldsGroup: 'password', // Alterado para 'fieldsGroup' e definido como 'password'
      placeholder: 'Digite sua senha',
      validators: [
        { name: 'required', message: 'A senha é obrigatória.' },
        { name: 'minLength', value: 6, message: 'A senha deve ter no mínimo 6 caracteres.' },
        { name: 'maxLength', value: 30, message: 'A senha deve conter no máximo 30 caracteres' }
      ]
    },
    {
      name: 'confirm_password',
      label: 'Confirmar Senha',
      type: 'password',
      initialValue: '',
      fieldsGroup: 'password', // Alterado para 'fieldsGroup' e definido como 'password'
      placeholder: 'Confirme sua senha',
      validators: [
        { name: 'required', message: 'A confirmação de senha é obrigatória.' },
        { name: 'minLength', value: 6, message: 'A senha deve ter no mínimo 6 caracteres.' },
        { name: 'maxLength', value: 30, message: 'A senha deve conter no máximo 30 caracteres' }
      ]
    }
  ]
};