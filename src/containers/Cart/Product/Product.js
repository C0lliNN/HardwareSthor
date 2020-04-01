import React from 'react'
import classes from './Product.module.css'
import { Row, Col, Button } from 'antd'
import { FormattedMessage } from 'react-intl'

const Product = props => (
    <article className={classes.Product}>
        <Row justify="space-between">
            <Col xs={10} md={5} xl={3}>
                <div>
                    <img src={props.img} alt={props.title}/>
                </div>
            </Col>

            <Col xs={13} md={18}  xl={20}>
                <h3>{props.title}</h3>
                <div>
                    <Button type="primary">
                        <FormattedMessage               id="CarouselItem.Details"                   defaultMessage="Details"/>
                    </Button>&nbsp;
                    <Button 
                        type="primary"
                        className={classes.Remove}>
                            <FormattedMessage id="Product.Remove"
                            defaultMessage="Remove"/>
                    </Button>
                </div>
            </Col>
            
        </Row>
        
    </article>
);

export default Product;