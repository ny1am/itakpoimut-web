import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ user, size, ...rest }) => {
  const modifier = size?'-'+size:'';
  const src = user.picture_url || `/assets/img/no-user-image${modifier}.png`;
  return (<img src={src} {...rest} />);
};

Avatar.propTypes = {
  user: PropTypes.shape({
    picture_url: PropTypes.string,
  }).isRequired,
  size: PropTypes.number,
};

export default Avatar;
