import { History, LocationDescriptorObject } from 'history';
import { RouteConfig } from 'react-router-config';

interface ChildHistoryOptions {
  history: History;
  basename?: string;
}

// Replacement methods for the history.
// Prefixes navigation and HREF creation params with the provided base path
// before calling the original history methods.
const createChildHistoryMethods = ({
  history,
  basename = ''
}: ChildHistoryOptions): Pick<History, 'push' | 'replace' | 'createHref'> => ({
  push(path: string | LocationDescriptorObject, state?: any) {
    if (typeof path === 'string') {
      history.push(basename + path, state);
    } else {
      return history.push({
        ...path,
        pathname: basename + path.pathname
      });
    }
  },
  replace(path: string | LocationDescriptorObject, state?: any) {
    if (typeof path === 'string') {
      history.replace(basename + path, state);
    } else {
      return history.replace({
        ...path,
        pathname: basename + path.pathname
      });
    }
  },
  createHref(location: LocationDescriptorObject) {
    const prefixedLocation = {
      ...location,
      pathname: basename + location.pathname
    };

    return history.createHref(prefixedLocation);
  }
});

// History proxy implementation for the child applications.
// Proxies calls to history to the replacements methods provided above.
export const createChildHistory = (options: ChildHistoryOptions) => {
  const { history } = options;
  const childHistoryMethods = createChildHistoryMethods(options);

  const childHistory = new Proxy(history, {
    get(target, key) {
      // @ts-ignore
      const originalMethod = target[key];
      // @ts-ignore
      const proxiedMethod = childHistoryMethods[key];

      if (proxiedMethod) {
        return proxiedMethod;
      }

      return originalMethod;
    }
  });

  return childHistory;
};

export const prefixRoutes = (
  prefix: string,
  routes: RouteConfig[]
): RouteConfig[] => {
  const prefixedRoutes = routes.map(route => ({
    ...route,
    path: prefix + route.path,
    ...(route.routes && { routes: prefixRoutes(prefix, route.routes) })
  }));

  return prefixedRoutes;
};
