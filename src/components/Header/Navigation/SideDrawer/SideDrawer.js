import PropTypes from 'prop-types';
import React from 'react';
import classes from './SideDrawer.module.css';
import { Drawer, Typography } from 'antd';
import LinkList from '../LinkList/LinkList';
import Categories from '../../../SideBar/Categories/Categories';
import { FormattedMessage } from 'react-intl';

const { Title } = Typography;

const SideDrawer = (props) => {
  return (
    <Drawer
      className={classes.SideDrawer}
      title="Menu"
      placement="right"
      closable={true}
      keyboard
      onClose={props.closeSideDrawer}
      headerStyle={{
        textAlign: 'center',
        fontSize: '1.5em'
      }}
      visible={props.show}
    >
      <div style={{ color: 'white' }}>a</div>
      <div onClick={props.closeSideDrawer}>
        <LinkList disableCartPopover />
      </div>
      <div style={{ color: 'white' }}>a</div>
      <hr />
      <Title level={3}>
        <FormattedMessage id="SideBar.Categories" defaultMessage="Categories" />
      </Title>
      <div onClick={props.closeSideDrawer}>
        <Categories />
      </div>
    </Drawer>
  );
};

SideDrawer.propTypes = {
  closeSideDrawer: PropTypes.func,
  show: PropTypes.bool
};

export default SideDrawer;
