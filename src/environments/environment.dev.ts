import { Environment } from './environment.model';

// TODO (etapa 03): substituir pelo domínio real de dev após configurar o CloudFront
export const environment: Environment = {
  name: 'dev',
  production: false,
  apiUrl: 'https://api-dev.eduardozagato.com',
  featureFlags: {},
};
