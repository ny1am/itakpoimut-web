import React from 'react';
import PropTypes from 'prop-types';

function fixProps(props, page) {
  let result = Object.assign({}, props);
  for (let name in result) {
    if (props.hasOwnProperty(name)) {
      if (typeof result[name] === 'string' || result[name] instanceof String) {
        result[name] = result[name].replace(/{{page}}/g, page);
      }
    }
  }
  return result;
}

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.size = 5;
  }

  renderChildElement(page, innerText) {
    let props = fixProps(this.props.children.props, page);
    if (this.props.changePage) {
      props.onClick = (evt) => {
        this.props.changePage(evt, page);
      };
    }
    return React.cloneElement(this.props.children, props, innerText);
  }
  renderPrevPage() {
    let privPage = Number(this.props.currentPage) - 1;
    privPage = privPage<1?1:privPage;
    return (
      <li className="prev">
        {this.renderChildElement(privPage)}
      </li>
    );
  }
  renderNextPage() {
    let nextPage = Number(this.props.currentPage) + 1;
    nextPage = nextPage>this.props.totalPages?this.props.totalPages:nextPage;
    return (
      <li className="next">
        {this.renderChildElement(nextPage)}
      </li>
    );
  }
  renderPages() {
    let startPage = Number(this.props.currentPage) - Math.floor(this.size / 2);
    let endPage = Number(this.props.currentPage) + Math.floor(this.size / 2);
    if (startPage <= 0) {
      endPage -= (startPage - 1);
      startPage = 1;
    }
    if (endPage > this.props.totalPages) {
      endPage = this.props.totalPages;
      if (endPage - this.size + 1 > 0) {
        startPage = endPage - this.size + 1;
      } else {
        startPage = 1;
      }
    }
    let pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push({
        index: i,
        active: (i===Number(this.props.currentPage))
      });
    }
    return pages.map((page, index) => (
      <li key={index} className={page.active?'page active':'page'}>
        {this.renderChildElement(page.index, page.index)}
      </li>
    ));
  }
  render() {
    if (this.props.totalPages > 1) {
      return (
        <ul className="pagination">
          {this.renderPrevPage()}
          {this.renderPages()}
          {this.renderNextPage()}
        </ul>
      );
    } else {
      return null;
    }
  }
}

Pagination.propTypes = {
  children: PropTypes.node,
  changePage: PropTypes.func,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
};

export default Pagination;
