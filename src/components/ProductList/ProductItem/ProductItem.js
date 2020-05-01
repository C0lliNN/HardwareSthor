import React from "react";
import classes from "./ProductItem.module.css";
import { NavLink, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { Typography } from "antd";

const { Title } = Typography;

const ProductItem = (props) => {
  const imgHolderStyle = {};

  if (props.imgHolderWidth) {
    imgHolderStyle.width = props.imgHolderWidth;
  } else {
    imgHolderStyle.width = "30%";
  }

  return (
    <NavLink
      to={
        props.link
          ? props.link
          : `${props.match.params.category}/product/${props.id}`
      }
      className={classes.Link}
    >
      <article className={classes.ProductItem}>
        <div className={classes.ImgHolder} style={imgHolderStyle}>
          <img src={props.img} alt={props.title} />
        </div>

        <div className={classes.ProductInfo}>
          <Title level={4}>{props.title}</Title>

          <Title level={4} className={classes.Price}>
            <FormattedMessage id="CarouselItem.Currency" defaultMessage="$" />
            {props.totalPrice.toFixed(2)}
          </Title>
        </div>
      </article>
    </NavLink>
  );
};

export default withRouter(ProductItem);
