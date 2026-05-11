import { Environment } from './environment.model';

// TODO (etapa 03): substituir pelo domínio real de hom após configurar o CloudFront
export const environment: Environment = {
  name: 'hom',
  production: false,
  apiUrl: 'https://api-hom.edoha.<dominio>',
  featureFlags: {},
};
