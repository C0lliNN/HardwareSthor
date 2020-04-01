import React from 'react'
import classes from './MainPage.module.css'
import i5Image from '../../assets/i5-image.jpg'
import ssdImage from '../../assets/ssd.jpg'
import xboxImage from '../../assets/xbox.jpg'
import { Carousel, Row, Col } from 'antd'
import CarouselItem from '../../components/CarouselItem/CarouselItem'
import SideBar from '../../components/SideBar/SideBar'
import ProductList from '../../components/ProductList/ProductList'
import { FormattedMessage } from 'react-intl'

const MainPage = () => {

    const carouselItemsData = [
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
        },
    ];

    const productList = [
        {
            title: 'Console Microsoft Xbox One S 1TB Branco + PES 2020 - 234-01120',
            totalPrice: 1999,
            discountPrice: 1555,
            img: xboxImage
        }
    ]

    const carouselItemsElements = carouselItemsData.map(item => (
        <CarouselItem 
            key={item.title}
            title={item.title} 
            img={item.img}
            fullLink={item.fullLink}
            discountPrice={item.discountPrice}
            totalPrice={item.totalPrice}/>
    ))


    const productListElements = [];

    for (let i = 0; i < 20; i++) {
        productListElements.push(
             {...productList[0], id: i}
        )
    }

    return (
        <div>
            <Carousel autoplay className={classes.Carousel}>
                {carouselItemsElements}
            </Carousel>

            
            <Row align="top" justify="space-between" className={classes.Content}>
                <Col xs={0} md={8}>
                    <SideBar/>
                </Col>
                <Col xs={24} md={15} className={classes.Offers}>

                    <h3>
                        <FormattedMessage
                            id="MainPage.Offers"
                            defaultMessage="Offers"/>
                    </h3>
                    
                    <ProductList products={productListElements}/>
                        
                </Col>
            </Row>
        </div>
    )
}

export default MainPage