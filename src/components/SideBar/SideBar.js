import React from 'react';
import classes from './SideBar.module.css';
import { FormattedMessage } from 'react-intl';
import Categories from './Categories/Categories';
import { Typography } from 'antd';

const { Title } = Typography;

const SideBar = () => {
  return (
    <aside className={classes.SideBar}>
      <Title level={3}>
        <FormattedMessage id="SideBar.Categories" defaultMessage="Categories" />
      </Title>

      <Categories />
    </aside>
  );
};

export default SideBar;
