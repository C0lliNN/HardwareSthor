import PropTypes from 'prop-types';
import React from 'react';
import classes from './Product.module.css';
import CreditCardOutlined from '@ant-design/icons/CreditCardOutlined';
import BarcodeOutlined from '@ant-design/icons/BarcodeOutlined';
import { FormattedMessage } from 'react-intl';
import { InputNumber, Button, Typography } from 'antd';
import Description from './Description/Description';

const { Title, Text } = Typography;

const Product = ({ product, quantityHandler, buyHandler }) => {
  let formattedTotalPrice = null;
  let formattedInstallment = null;
  let formattedDiscountPrice = null;

  if (product.totalPrice) {
    formattedTotalPrice = (product.totalPrice * product.quantity)
      .toFixed(2)
      .replace('.', ',');
    formattedInstallment = ((product.totalPrice / 10) * product.quantity)
      .toFixed(2)
      .replace('.', ',');
  }

  if (product.discountPrice) {
    formattedDiscountPrice = (product.discountPrice * product.quantity)
      .toFixed(2)
      .replace('.', ',');
  }

  return (
    <article className={classes.Product}>
      <div className={classes.FirstCard}>
        <Title level={2}>{product.title}</Title>
        <div className={classes.ImgHolder}>
          <img src={product.img} alt={product.title} />
        </div>
        <div className={classes.Info}>
          <div className={classes.PaymentMethod}>
            <div className={classes.IconContainer}>
              <CreditCardOutlined className={classes.Icon} />
            </div>

            <div className={classes.Value}>
              <p>
                <FormattedMessage
                  id="CarouselItem.Currency"
                  defaultMessage="$"
                />{' '}
                {formattedTotalPrice}
              </p>

              <p>
                <FormattedMessage
                  id="CarouselItem.Currency"
                  defaultMessage="$"
                />
                {formattedInstallment}&nbsp;
                <Text className={classes.Text}>
                  <FormattedMessage
                    id="CarouselItem.Installments"
                    defaultMessage="in ten installments"
                  />
                </Text>
              </p>
            </div>
          </div>
          <div className={classes.PaymentMethod} style={{ marginTop: '20px' }}>
            <div className={classes.IconContainer}>
              <BarcodeOutlined className={classes.Icon + ' ' + classes.Green} />
            </div>

            <div className={classes.Value + ' ' + classes.Green}>
              <p>
                <FormattedMessage
                  id="CarouselItem.Currency"
                  defaultMessage="$"
                />{' '}
                {formattedDiscountPrice}
                &nbsp;
                <Text className={classes.Text}>
                  <FormattedMessage
                    id="CarouselItem.Cash"
                    defaultMessage="in cash"
                  />
                </Text>
              </p>
            </div>
          </div>
          <div className={classes.Quantity}>
            <label htmlFor="quantity">
              <FormattedMessage
                id="Product.Quantity"
                defaultMessage="Quantity: "
              />
            </label>
            <InputNumber
              value={product.quantity}
              id="quantity"
              onChange={(event) => quantityHandler(event)}
              min={1}
            />
          </div>
          <div className={classes.ButtonContainer}>
            <Button
              type="primary"
              className={classes.Button}
              onClick={buyHandler}
            >
              <FormattedMessage id="CarouselItem.Buy" defaultMessage="Buy" />
            </Button>
          </div>
        </div>
      </div>
      {product.description && <Description description={product.description} />}
    </article>
  );
};

Product.propTypes = {
  buyHandler: PropTypes.func.isRequired,
  product: PropTypes.shape({
    description: PropTypes.array,
    discountPrice: PropTypes.number,
    img: PropTypes.string,
    quantity: PropTypes.number,
    title: PropTypes.string,
    totalPrice: PropTypes.number
  }),
  quantityHandler: PropTypes.func
};
export default React.memo(Product);
