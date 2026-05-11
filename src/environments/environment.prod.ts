import { Environment } from './environment.model';

// TODO (etapa 03): substituir pelo domínio real de prod após configurar o CloudFront
export const environment: Environment = {
  name: 'prod',
  production: true,
  apiUrl: 'https://api.edoha.<dominio>',
  featureFlags: {},
};
