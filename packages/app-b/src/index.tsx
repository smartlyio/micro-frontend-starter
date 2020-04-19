import * as React from 'react';
import { Link, Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { prefixRoutes, createChildHistory } from 'child-history';
import ComponentA from 'component-a';
import { History } from 'history';

const ViewC = () => (
  <div>
    <h1>View C </h1>
    <ComponentA />
  </div>
);

const ViewD = () => (
  <div>
    <h1>View D</h1>
  </div>
);

const Dashboard = () => (
  <ul>
    <li>
      <Link to="/view-c">View C</Link>
    </li>
    <li>
      <Link to="/view-d">View D</Link>
    </li>
  </ul>
);

const routes = [
  {
    path: '/view-c',
    component: ViewC
  },
  {
    path: '/view-d',
    component: ViewD
  },
  {
    path: '/',
    exact: true,
    component: Dashboard
  }
];

interface AppBProps {
  basename: string;
  history: History;
}

const AppB = ({ basename, history }: AppBProps) => {
  // Prefix routes with the provided base path
  const prefixedRoutes = prefixRoutes(basename, routes);
  // Add proxy layer to history
  const childHistory = createChildHistory({ history, basename });

  return <Router history={childHistory}>{renderRoutes(prefixedRoutes)}</Router>;
};

export default AppB;
