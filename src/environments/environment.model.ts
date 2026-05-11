// Decisão arquitetural: usamos build-per-env (um bundle por ambiente via fileReplacements).
// Runtime config (único bundle + config injetada em runtime) não foi adotada.
export interface Environment {
  name: 'local' | 'dev' | 'hom' | 'prod';
  production: boolean;
  apiUrl: string;
  featureFlags: Record<string, unknown>;
}
