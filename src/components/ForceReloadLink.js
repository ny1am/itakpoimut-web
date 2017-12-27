import React from 'react';
import PropTypes from 'prop-types';
import { createLocation } from 'history';
import { Link } from 'react-router-dom';
import randomstring from 'randomstring';

const ForceReloadLink = ({ to, ...props }) => {
  const hash = randomstring.generate(7);
  let location = typeof to === 'string' ? createLocation(to) : to;
  location = Object.assign({}, location, {
    state: Object.assign({}, location.state, {
      forceReload: hash,
    })
  });
  return <Link to={location} {...props} />;
};

ForceReloadLink.propTypes = {
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
};

export default ForceReloadLink;
