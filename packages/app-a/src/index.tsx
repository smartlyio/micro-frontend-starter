import * as React from 'react';
import { Link, Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { prefixRoutes, createChildHistory } from 'child-history';
import ComponentA from 'component-a';
import { History } from 'history';

const ViewA = () => (
  <div>
    <h1>View A</h1>
    <ComponentA />
  </div>
);

const ViewB = () => (
  <div>
    <h1>View B</h1>
  </div>
);

const Dashboard = () => (
  <ul>
    <li>
      <Link to="/view-a">View A</Link>
    </li>
    <li>
      <Link to="/view-b">View B</Link>
    </li>
  </ul>
);

const routes = [
  {
    path: '/view-a',
    component: ViewA
  },
  {
    path: '/view-b',
    component: ViewB
  },
  {
    path: '/',
    exact: true,
    component: Dashboard
  }
];

interface AppAProps {
  basename: string;
  history: History;
}

const AppA = ({ basename, history }: AppAProps) => {
  // Prefix routes with the provided base path
  const prefixedRoutes = prefixRoutes(basename, routes);
  // Add proxy layer to history
  const childHistory = createChildHistory({ history, basename });

  return <Router history={childHistory}>{renderRoutes(prefixedRoutes)}</Router>;
};

export default AppA;
