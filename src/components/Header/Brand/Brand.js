import React from 'react'
import classes from './Brand.module.css'
import HddOutlined  from '@ant-design/icons/HddOutlined';
import { Row, Col } from 'antd';


const Brand = () => (
    <div className={classes.Brand}>
        <Row align="middle">
            <Col span={3}>
                <HddOutlined className={classes.Icon}/> 
            </Col>
            <Col span={21}>
                <h1>HardwareSThor</h1>    
            </Col>
        </Row>
        
    </div>
)

export default Brand;