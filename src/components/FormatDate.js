import PropTypes from 'prop-types';

const leadingZero = (number) => {
  if (number < 10) {
    return '0' + number.toString();
  } else {
    return number.toString();
  }
};

const FormatDate = ({ dateString }) => {
  const d = new Date(dateString);
  const dformat = [
    leadingZero(d.getDate()),
    leadingZero(d.getMonth()+1),
    d.getFullYear()
  ].join('.');
  return dformat;
};

FormatDate.propTypes = {
  dateString: PropTypes.string.isRequired,
};

export default FormatDate;
