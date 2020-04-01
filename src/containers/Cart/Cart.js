import React from 'react'
import classes from './Cart.module.css'
import { Card, Button } from 'antd'
import { injectIntl, FormattedMessage } from 'react-intl';
import Product from './Product/Product';
import i5Image from '../../assets/i5-image.jpg'
import ssdImage from '../../assets/ssd.jpg'
import xboxImage from '../../assets/xbox.jpg'

const Cart = props => {

    const products = [
        {
            title: 'Processador Intel Core i5-7400 Kaby Lake, Cache 6MB, 3Ghz (3.5GHz Max Turbo), LGA 1151 - BX80677I57400',
            totalPrice: 800,
            discountPrice: 720,
            img: i5Image,
            fullLink: '/product/i5'
        },
        {
            title: 'SSD Kingston A400, 240GB, SATA, Leitura 500MB/s, Gravação 350MB/s - SA400S37/240G',
            totalPrice: 269,
            discountPrice: 229,
            img: ssdImage,
            fullLink: '/product/ssd'
        },
        {
            title: 'Console Microsoft Xbox One S 1TB Branco + PES 2020 - 234-01120',
            totalPrice: 1999,
            discountPrice: 1555,
            img: xboxImage,
            fullLink: '/product/xbox'
        }
    ]

    const productsElements = products.map(product => (
        <Product {...product}/>
    ))

    return (
        <section className={classes.Cart}>
            <Card 
                title={props.intl.formatMessage({
                    id: 'Cart.Cart',
                    defaultMessage: 'Cart'
                })}
                headStyle={{
                    fontSize: '1.8em',
                    textAlign: "center"
                }}
                style={{
                    boxShadow: '0px 0px 2px rgba(48, 48, 48, 0.3)'
                }}>

                <ul>
                    {productsElements}
                </ul>

                <div className={classes.BuyNowDiv}>
                    <Button
                        type="primary"
                        size="large"
                        className={classes.BuyNow}>
                            <FormattedMessage id="Cart.BuyNow" defaultMessage="Buy Now" />
                    </Button>
                </div>

            </Card>
        </section>
    );
}

export default injectIntl(Cart);