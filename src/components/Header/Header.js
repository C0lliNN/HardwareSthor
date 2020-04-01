import React from 'react'
import classes from './Header.module.css'
import Brand from './Brand/Brand'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import { Row, Col } from 'antd'

const Header = () => {

    return (
        <header className={classes.Header}>
            <Row align="middle">
                <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                    <Link to="/">
                        <Brand/>
                    </Link>
                </Col>
                <Col xs={12} sm={12} md={12} lg={16} xl={16}>
                    <Navigation/>
                </Col>
            </Row>
            
            
        </header>
    )
}

export default React.memo(Header);