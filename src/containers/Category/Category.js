import React from 'react'
import classes from './Category.module.css'
import { Row, Col } from 'antd'
import ProductList from '../../components/ProductList/ProductList'
import SideBar from '../../components/SideBar/SideBar'
import xboxImage from '../../assets/xbox.jpg'


const Category = () => {

    const productList = [
        {
            title: 'Console Microsoft Xbox One S 1TB Branco + PES 2020 - 234-01120',
            totalPrice: 1999,
            discountPrice: 1555,
            img: xboxImage
        }
    ]

    const productListElements = [];

    for (let i = 0; i < 20; i++) {
        productListElements.push(
             {...productList[0], id: i}
        )
    }

    return (
        <div className={classes.Category}>
            <Row align="top" justify="space-between">
                <Col xs={0} md={8}>
                    <SideBar/>
                </Col>
                <Col xs={24} md={15} className={classes.Products}>
                    <ProductList products={productListElements}/>
                        
                </Col>
            </Row>
        </div>
    );
    
}

export default Category;