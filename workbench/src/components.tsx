import * as React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { matchRoutes, renderRoutes } from 'react-router-config';
import Navigation from './navigation';

export const Typography = styled('div')`
  height: 100vh;
  font-size: 18px;
  line-height: 24px;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  display: flex;
  flex-direction: column;
`;

export const Content = styled('div')`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
