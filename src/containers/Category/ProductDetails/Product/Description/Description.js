import PropTypes from 'prop-types';
import React from 'react';
import classes from './Description.module.css';
import { FormattedMessage } from 'react-intl';
import { Typography } from 'antd';

const { Title } = Typography;

const Description = ({ description }) => {
  let content = null;

  if (description) {
    content = description.map((item) => {
      let title = item.title.trim();

      if (title[title.length - 1] === ':') {
        title = title.substring(0, title.length - 1);
      }

      let listItems = null;

      if (item.data) {
        listItems = item.data.map((subItem) => (
          <li key={subItem}>{subItem}</li>
        ));
      }

      return (
        <div key={title}>
          <Title level={4}>{title}</Title>
          <ul>{listItems}</ul>
        </div>
      );
    });
  }

  return (
    <div className={classes.Description}>
      <Title level={3}>
        <FormattedMessage
          id="Description.Description"
          defaultMessage="Description"
        />
      </Title>
      {content}
    </div>
  );
};

Description.propTypes = {
  description: PropTypes.array
};

export default Description;
