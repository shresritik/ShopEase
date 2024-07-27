export interface RouteDefinition {
  path: string;
  load: () => Promise<any>;
  auth?: boolean;
}
