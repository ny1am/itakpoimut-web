---
to: _tmp/<%= name %>/<%= name %>.js
---
import React from 'react';
<% if(!!locals.styles){ -%>

import styles from './styles.scss';
<%} -%>

class <%= name %> extends React.PureComponent {
  render() {
    return (
      <div<% if(!!locals.styles){ -%> className={styles.wrapper}<%} -%>>
        content here
      </div>
    );
  }
}

export default <%= name %>;

