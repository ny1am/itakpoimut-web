import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './styles.scss';

const PAGE_NUMBER_SIZE = 5;

//todo: revise this
class Pagination extends React.Component {

  renderPageElement(page, innerText) {
    const { generateUrl } = this.props;
    const to = generateUrl(page);
    return (
      <Link to={to}>
        {innerText}
      </Link>
    );
  }
  renderPrevPage() {
    let privPage = Number(this.props.currentPage) - 1;
    privPage = privPage<1?1:privPage;
    return (
      <li className={styles.prev}>
        {this.renderPageElement(privPage)}
      </li>
    );
  }
  renderNextPage() {
    let nextPage = Number(this.props.currentPage) + 1;
    nextPage = nextPage>this.props.totalPages?this.props.totalPages:nextPage;
    return (
      <li className={styles.next}>
        {this.renderPageElement(nextPage)}
      </li>
    );
  }
  renderPages() {
    let startPage = Number(this.props.currentPage) - Math.floor(PAGE_NUMBER_SIZE / 2);
    let endPage = Number(this.props.currentPage) + Math.floor(PAGE_NUMBER_SIZE / 2);
    if (startPage <= 0) {
      endPage -= (startPage - 1);
      startPage = 1;
    }
    if (endPage > this.props.totalPages) {
      endPage = this.props.totalPages;
      if (endPage - PAGE_NUMBER_SIZE + 1 > 0) {
        startPage = endPage - PAGE_NUMBER_SIZE + 1;
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
      <li
        key={index}
        className={cn(styles.page, { [styles.active]: page.active })}
      >
        {this.renderPageElement(page.index, page.index)}
      </li>
    ));
  }
  render() {
    if (this.props.totalPages > 1) {
      return (
        <ul className={styles.pagination}>
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
  generateUrl: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
};

export default Pagination;
