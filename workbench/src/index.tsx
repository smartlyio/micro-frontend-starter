import React from 'react';
import ReactDOM from 'react-dom';
import { renderRoutes, matchRoutes, RouteConfig } from 'react-router-config';
import { withRouter, Router } from 'react-router';
import Navigation from './navigation';
import { Typography, Content } from './components';
import { createBrowserHistory } from 'history';

const AppA = React.lazy(() => import('app-a'));

const AppB = React.lazy(() => import('app-b'));

const Root = withRouter((props: any) => {
  const { route, history } = props;
  const branch = matchRoutes(route.routes, location.pathname);
  const basename = branch[0].match.path;
  // The base path and history is being provided to the child applications
  const routeRenderer = renderRoutes(route.routes, { basename, history });

  return (
    <Typography>
      <Navigation />
      <Content>
        <React.Suspense fallback={<div>Loading...</div>}>
          {routeRenderer}
        </React.Suspense>
      </Content>
    </Typography>
  );
});

export const routes: RouteConfig[] = [
  {
    component: Root,
    // @ts-ignore
    routes: [
      {
        path: '/app-a',
        component: AppA
      },
      {
        path: '/app-b',
        component: AppB
      },
      {
        path: '/',
        exact: true,
        component: () => (
          <div>
            <h1>Select a child app</h1>
          </div>
        )
      }
    ]
  }
];

const renderer = renderRoutes(routes);
const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>{renderer}</Router>,
  document.getElementById('root') as HTMLElement
);
