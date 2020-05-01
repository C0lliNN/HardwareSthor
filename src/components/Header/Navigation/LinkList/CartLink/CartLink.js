import PropTypes from 'prop-types';
import React, { useState } from 'react';
import classes from './CartLink.module.css';
import { NavLink, withRouter } from 'react-router-dom';
import { Badge, Popover, Button, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import CartItem from '../../../../CartItem/CartItem';

const { Title, Text } = Typography;

const CartLink = (props) => {
  const [popoverVisible, setPopoverVisible] = useState(false);

  const buyNowHandler = () => {
    props.history.push('/checkout');
    closePopover();
  };

  const onVisibleChange = (visible) => {
    setPopoverVisible(visible);
  };

  const closePopover = () => {
    setPopoverVisible(false);
  };

  const popoverTitle = (
    <Title level={4} className={classes.PopoverTitle}>
      <FormattedMessage id="Cart.Cart" defaultMessage="Cart" />
    </Title>
  );

  const popoverContent = (
    <React.Fragment>
      {props.cart.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          title={item.title}
          unitPrice={item.totalPrice}
          quantity={item.quantity}
          img={item.img}
          url={item.url}
          width={'500px'}
          closePopoverHandler={closePopover}
        />
      ))}
      {props.cart.length > 0 ? (
        <Button
          type="primary"
          onClick={buyNowHandler}
          className={classes.BuyNow}
        >
          <FormattedMessage id="Cart.BuyNow" defaultMessage="Buy Now" />
        </Button>
      ) : (
        <p className={classes.Empty}>
          <FormattedMessage id="CartItem.Empty" defaultMessage="Empty" />
        </p>
      )}
    </React.Fragment>
  );

  return (
    <Popover
      placement="bottom"
      title={popoverTitle}
      content={popoverContent}
      trigger="hover"
      visible={popoverVisible}
      onVisibleChange={onVisibleChange}
    >
      <Badge count={props.count} style={{ boxShadow: 'none' }}>
        <NavLink
          className={classes.CartItem}
          to="/cart"
          activeClassName={classes.Active}
        >
          <ShoppingCartOutlined className={classes.Icon} />
          <Text className={classes.Text}>
            <FormattedMessage id="LinkList.Cart" defaultMessage="Cart" />
          </Text>
        </NavLink>
      </Badge>
    </Popover>
  );
};

CartLink.propTypes = {
  cart: PropTypes.array,
  count: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

export default withRouter(CartLink);
