import PropTypes from 'prop-types';
import React from 'react';
import classes from './CartItem.module.css';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Button, Typography } from 'antd';
import * as actionCreators from '../../store/actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

const CartItem = (props) => {
  const removeProduct = () => {
    const product = {
      id: props.id,
      title: props.title,
      totalPrice: props.unitPrice,
      quantity: props.quantity
    };

    props.removeProduct(product);
  };

  const goToProductDetails = () => {
    props.history.push(props.url);
    if (props.closePopoverHandler) {
      props.closePopoverHandler();
    }
  };

  return (
    <div className={classes.CartItem} style={{ width: props.width }}>
      <div className={classes.CartItemImgDiv}>
        <img src={props.img} alt={'HardwareSThor ' + props.title} />
      </div>
      <div className={classes.ProductInfo}>
        <Title level={4}>{props.title}</Title>
        <Paragraph>
          {props.intl.formatMessage({
            id: 'CarouselItem.Currency',
            defaultMessage: '$'
          }) +
            props.unitPrice * props.quantity}
          &nbsp;
          <Text className={classes.Quantity}>
            {props.quantity >= 2 && 'x' + props.quantity}
          </Text>
        </Paragraph>

        <div>
          <Button type="primary" onClick={goToProductDetails}>
            <FormattedMessage
              id="CarouselItem.Details"
              defaultMessage="Details"
            />
          </Button>
          &nbsp;
          <Button
            type="primary"
            className={classes.Remove}
            onClick={removeProduct}
          >
            <FormattedMessage id="Product.Remove" defaultMessage="Remove" />
          </Button>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  closePopoverHandler: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  id: PropTypes.string,
  img: PropTypes.string,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func
  }).isRequired,
  quantity: PropTypes.number,
  removeProduct: PropTypes.func,
  title: PropTypes.string,
  unitPrice: PropTypes.number,
  url: PropTypes.string,
  width: PropTypes.any
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeProduct: (product) => dispatch(actionCreators.removeProduct(product))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(React.memo(withRouter(injectIntl(CartItem))));
