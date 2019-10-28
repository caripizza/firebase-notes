import React from 'react';
import PropTypes from 'prop-types';

export default function Header(props) {
  return (
    <nav>
      <header>{props.children}</header>
    </nav>
  );
}

Header.propTypes = {
  children: PropTypes.object.isRequired
};
