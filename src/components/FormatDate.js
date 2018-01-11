import dateformat from 'dateformat';
import PropTypes from 'prop-types';

const FormatDate = ({ dateString }) => {
  const date = new Date(dateString);
  return dateformat(date, 'dd.mm.yyyy');
};

FormatDate.propTypes = {
  dateString: PropTypes.string.isRequired,
};

export default FormatDate;
