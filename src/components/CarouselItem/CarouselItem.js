import React, { useCallback } from 'react'
import classes from './CarouselItem.module.css'
import { Button, Row, Col } from 'antd'
import { withRouter } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';

const CarouselItem = props => {

    const { history, fullLink } = props

    const buyHandler = useCallback(() => {
        history.push(fullLink)
    }, [history, fullLink]);

    return (
        <article className={classes.CarouselItem}>
            <h2>{props.title}</h2>
            <Row align="middle">
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <div className={classes.ImgBox}>
                        <img src={props.img} alt="I5-7400 HardwareSThor"/>
                    </div>    
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <div className={classes.PriceBox}>
                        <Row align="middle" justify="center">
                            <Col xs={24} lg={12}>
                                <h4
                                    className={classes.DiscountPrice}>
                                        {props.intl.formatMessage({
                                        id: 'CarouselItem.Currency',
                                        defaultMessage: "$ "
                                    }) + props.discountPrice + ",00"}
                                </h4>
                            </Col>
                            <Col xs={24} lg={12}>
                                <p className={classes.InCash}>
                                    <FormattedMessage 
                                        id="CarouselItem.Cash"
                                        defaultMessage="in cash"/>
                                </p>
                            </Col>
                        </Row>

                        <Row align="middle" justify="center">
                            <Col xs={24} lg={12}>
                                <h4
                                    className={classes.TotalPrice}>
                                        {props.intl.formatMessage({
                                        id: 'CarouselItem.Currency',
                                        defaultMessage: "$ "
                                    }) + props.totalPrice + ",00"}
                                </h4>
                            </Col>
                            <Col xs={24} lg={12} align="center">
                                <p className={classes.InInstallments}>
                                    <FormattedMessage 
                                        id="CarouselItem.Installments"
                                        defaultMessage="in ten installments"/>
                                </p>
                            </Col>
                        </Row>
                        
                        <div className={classes.ButtonBox}>
                            <div>
                                <Button 
                                    type="primary"
                                    size="large"
                                    className={classes.BuyButton}
                                    onClick={buyHandler}>
                                        <FormattedMessage
                                            id="CarouselItem.Buy"
                                            defaultMessage="Buy"/>
                                </Button>
                            </div>
                            
                            <div>
                                <Button 
                                    type="primary"
                                    size="large"
                                    onClick={() => {}}>
                                        <FormattedMessage
                                            id="CarouselItem.Details"
                                            defaultMessage="Details"/>
                                </Button>
                            </div>
                        </div>

                        
                    </div>
                </Col>
            </Row>
            
            
        </article>
    );
}

export default injectIntl(withRouter(CarouselItem));