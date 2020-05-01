import React from 'react';
import classes from './Brand.module.css';
import HddOutlined from '@ant-design/icons/HddOutlined';
import { Row, Col, Typography } from 'antd';

const { Title } = Typography;

const Brand = () => (
  <div className={classes.Brand}>
    <Row align="middle">
      <Col span={3}>
        <HddOutlined className={classes.Icon} />
      </Col>
      <Col span={21}>
        <Title>HardwareSThor</Title>
      </Col>
    </Row>
  </div>
);

export default Brand;
