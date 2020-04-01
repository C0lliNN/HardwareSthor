import React from 'react'
import classes from './SideBar.module.css'
import { FormattedMessage } from 'react-intl'
import Categories from './Categories/Categories'
import { Row, Col } from 'antd'
import SearchBar from '../Navigation/SearchBar/SearchBar'

const SideBar = () => {

    return (
        <aside className={classes.SideBar}>
            <h3>
                <FormattedMessage
                    id="SideBar.Categories"
                    defaultMessage="Categories"/>
            </h3>

            <Row justify="center" align="middle">
                <Col xs={24} lg={0} className={classes.SearchBar}>
                    
                        <SearchBar/>
                    
                </Col>
            </Row>

            <Categories/>
        </aside>
    )
}

export default SideBar;