import PropTypes from 'prop-types';
import React from 'react';
import classes from './LinkList.module.css';
import { Badge } from 'antd';
import { injectIntl } from 'react-intl';
import LoginOutlined from '@ant-design/icons/LoginOutlined';
import ShoppingOutlined from '@ant-design/icons/ShoppingOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import LinkItem from './LinkItem/LinkItem';
import CartLink from './CartLink/CartLink';
import { connect } from 'react-redux';

const LinkList = (props) => {
  const authenticatedLinks = [
    {
      text: props.intl.formatMessage({
        id: 'LinkList.Orders',
        defaultMessage: 'Orders'
      }),
      icon: ShoppingOutlined,
      path: '/orders'
    },
    {
      text: props.intl.formatMessage({
        id: 'LinkList.Logout',
        defaultMessage: 'Logout'
      }),
      icon: LogoutOutlined,
      path: '/logout'
    }
  ];

  const unauthenticatedLinks = [
    {
      text: props.intl.formatMessage({
        id: 'LinkList.Login',
        defaultMessage: 'Login'
      }),
      icon: LoginOutlined,
      path: '/login'
    }
  ];

  const links = props.isAuth ? authenticatedLinks : unauthenticatedLinks;

  let cartLink = <CartLink count={props.cart.length} cart={props.cart} />;

  if (props.disableCartPopover) {
    cartLink = (
      <Badge count={props.count} style={{ boxShadow: 'none' }}>
        <LinkItem
          icon={ShoppingCartOutlined}
          text={props.intl.formatMessage({
            id: 'LinkList.Cart',
            defaultMessage: 'Cart'
          })}
          path="/cart"
        />
      </Badge>
    );
  }

  return (
    <ul className={classes.LinkList}>
      {cartLink}

      {links.map((link) => (
        <LinkItem
          key={link.text}
          icon={link.icon}
          text={link.text}
          path={link.path}
        />
      ))}
    </ul>
  );
};

LinkList.propTypes = {
  cart: PropTypes.array,
  count: PropTypes.number,
  disableCartPopover: PropTypes.bool,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func
  }).isRequired,
  isAuth: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token != null,
    cart: state.cart
  };
};

export default connect(mapStateToProps)(injectIntl(LinkList));
