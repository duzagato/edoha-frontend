export interface Environment {
  name: 'local' | 'dev' | 'hom' | 'prod';
  production: boolean;
  apiUrl: string;
  featureFlags: Record<string, unknown>;
}
