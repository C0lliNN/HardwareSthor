import PropTypes from 'prop-types';
import React from 'react';
import classes from './LinkItem.module.css';
import { NavLink } from 'react-router-dom';
import { Typography } from 'antd';

const { Text } = Typography;

const LinkItem = (props) => (
  <NavLink
    className={classes.LinkItem}
    to={props.path}
    activeClassName={classes.Active}
  >
    <props.icon className={classes.Icon} />
    <Text className={classes.Text}>{props.text}</Text>
  </NavLink>
);

LinkItem.propTypes = {
  icon: PropTypes.any.isRequired,
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default React.memo(LinkItem);
