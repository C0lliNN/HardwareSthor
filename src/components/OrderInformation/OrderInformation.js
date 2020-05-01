import PropTypes from "prop-types";
import React from "react";
import classes from "./OrderInformation.module.css";
import { FormattedMessage } from "react-intl";
import { Typography } from "antd";

const { Text, Paragraph } = Typography;

const OrderInformation = (props) => {
  let totalPrice = null;

  for (const product of props.products) {
    totalPrice += product.totalPrice;
  }

  return (
    <div className={classes.OrderInformation}>
      {props.products.map((product) => (
        <div key={product.title} className={classes.Product}>
          <Paragraph>
            {product.title} ( {product.quantity}&nbsp;
            <FormattedMessage
              id="OrderInformation.Unit"
              defaultMessage="unit"
            />
            {product.quantity > 1 ? "s" : ""} ) - &nbsp;
            <Text>
              <FormattedMessage id="CarouselItem.Currency" defaultMessage="$" />
              {product.totalPrice.toFixed(2)}
            </Text>
          </Paragraph>
        </div>
      ))}
      <div className={classes.TotalPrice}>
        <FormattedMessage id="OrderInformation.Total" defaultMessage="Total" />
        :&nbsp;
        <Text>
          <FormattedMessage id="CarouselItem.Currency" defaultMessage="$" />
          {totalPrice.toFixed(2)}
        </Text>
      </div>
    </div>
  );
};

OrderInformation.propTypes = {
  products: PropTypes.array,
};

export default OrderInformation;
