import React from 'react';
import { Switch, Route, SwitchProps } from 'react-router';

import { RouteConfig } from './index.d';

export function renderRoutes(
  routes: RouteConfig[] | undefined = [],
  extraProps?: any,
  switchProps?: SwitchProps
): JSX.Element {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, idx) => (
        <Route
          key={route.key || idx}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props) => {
            if (route.render) {
              return route.render({ ...props, ...extraProps, route: route });
            }

            if (route.component) {
              return (
                <route.component
                  {...props}
                  {...extraProps}
                  meta={route.meta || {}}
                  route={route}
                >
                  {route.routes?.length ? renderRoutes(route.routes) : null}
                </route.component>
              );
            }

            // 子页面渲染
            if (route.routes) {
              return renderRoutes(route.routes);
            }

            return null;
          }}
        />
      ))}
    </Switch>
  ) : (
    <> {null}</>
  );
}
