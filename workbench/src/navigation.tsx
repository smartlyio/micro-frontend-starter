import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = styled('nav')`
  border-bottom: 1px solid #e4e4e4;
  padding: 0 12px;
  background: purple;
  color: white;
`;

const InlineList = styled('ul')`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InlineListItem = styled('li')`
  display: inline-block;
  padding: 0;
  margin: 0 12px 0 0;
`;

const NavBarLink = styled(NavLink)`
  display: inline-block;
  text-transform: uppercase;
  padding: 12px;
  color: white;
  text-decoration: none;

  &.active {
    box-shadow: 0 -3px white inset;
  }
`;

const Navigation = () => (
  <NavBar>
    <InlineList>
      <InlineListItem>Micro Frontend Workbench:</InlineListItem>
      <InlineListItem>
        <NavBarLink to="/app-a">App A</NavBarLink>
      </InlineListItem>
      <InlineListItem>
        <NavBarLink to="/app-b">App B</NavBarLink>
      </InlineListItem>
    </InlineList>
  </NavBar>
);

export default Navigation;
