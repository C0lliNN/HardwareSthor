import PropTypes from "prop-types";
import React from "react";
import classes from "./Order.module.css";
import { Typography } from "antd";
import { FormattedMessage, FormattedDate } from "react-intl";
import { NavLink } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

const Order = ({ order }) => {
  return (
    <li className={classes.Order}>
      <NavLink to={`/orders/${order.id}`}>
        <Title level={3}>
          {order.orderInformation.products
            .map((product) => {
              return product.title.replace("&", ",");
            })
            .join(" & ")}
        </Title>
        <Paragraph className={classes.Total}>
          <FormattedMessage
            id="OrderInformation.Total"
            defaultMessage="Total"
          />
          :&nbsp;
          <Text className={classes.Price}>
            <FormattedMessage id="CarouselItem.Currency" defaultMessage="$" />
            {order.orderInformation.totalAmount.toFixed(2)}
          </Text>
        </Paragraph>

        <Paragraph className={classes.Date}>
          <FormattedMessage id="Order.Date" defaultMessage="Date" />
          <Text>
            <FormattedDate
              value={order.date}
              day="2-digit"
              month="2-digit"
              year="numeric"
            />
          </Text>
        </Paragraph>
      </NavLink>
    </li>
  );
};

Order.propTypes = {
  order: PropTypes.shape({
    date: PropTypes.any,
    id: PropTypes.any,
    orderInformation: PropTypes.shape({
      products: PropTypes.array,
      totalAmount: PropTypes.number,
    }),
  }),
};

export default Order;
