import { RouteComponentProps } from 'react-router';

export interface RouteConfigComponentProps<
  Params extends { [K in keyof Params]?: string } = {}
> extends RouteComponentProps<Params> {
  route?: RouteConfig;
  meta?: { [metaKey: string]: any };
}

export interface RouteConfig {
  path?: string;
  key?: React.Key;
  location?: Location;
  component?:
    | React.ComponentType<RouteConfigComponentProps<any>>
    | React.ComponentType;
  exact?: boolean;
  strict?: boolean;
  routes?: RouteConfig[];
  render?: (props: RouteConfigComponentProps<any>) => React.ReactNode;
  meta?: { [metaKey: string]: any };
  [propName: string]: any;
}
