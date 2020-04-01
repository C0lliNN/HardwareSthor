import React from 'react'
import classes from './ProductItem.module.css'
import { Button } from 'antd'
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const ProductItem = props => (
    <article className={classes.ProductItem}>
        {console.log(props)}
        <NavLink 
            to={"/product/" + props.id}
            className={classes.Link}>
            <h4>{props.title}</h4>
            <div className={classes.ImgHolder}>
                <img src={props.img} alt={props.title}/>
            </div>
        </NavLink>
        <div>
            <Button
                type="primary"
                className={classes.BuyButton}>
                    <FormattedMessage
                        id="CarouselItem.Buy"
                        defaultMessage="Buy"/>
            </Button>
        </div>
        <div>
            <Button
                type="primary">
                    <FormattedMessage
                        id="CarouselItem.Details"
                        defaultMessage="Details"/>
            </Button>
        </div>
    </article>
);

export default ProductItem;