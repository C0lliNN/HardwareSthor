import React from 'react'
import classes from './HorizontalMenu.module.css'
import SearchBar from '../SearchBar/SearchBar';
import LinkList from '../LinkList/LinkList';
import { Row, Col } from 'antd';


const HorizontalMenu = () => {

    return (
        <div className={classes.HorizontalMenu}>
            <Row align="middle" justify="space-around">
                <Col sm={0} md={0} lg={12} xl={12}>
                    <SearchBar/>
                </Col>
                <Col sm={24} md={24} lg={12} xl={12}>
                    <LinkList/>
                </Col>
            </Row>
        </div>
    )
}

export default HorizontalMenu;