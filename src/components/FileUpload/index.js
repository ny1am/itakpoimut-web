import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class FileUpload extends React.PureComponent {

  constructor(props) {
    super(props);
    this.setupFileReader();
    this.state = {
      previewSrc: null,
      validationResult: null,
      dirty: false,
    };
  }

  componentWillReceiveProps(newProps) {
    //todo: don't like this
    if (newProps.stateKey !== this.props.stateKey) {
      this.setState({
        validationResult: null,
        dirty: false,
      });
    }
  }

  setupFileReader() {
    this.reader = new FileReader();
    this.reader.addEventListener('load', () => {
      this.setState({ previewSrc: this.reader.result });
    }, false);
  }

  validate(file) {
    return file && file.type.startsWith('image/');
  }

  onChange = () => {
    const { onChange } = this.props;
    let file = this.fileUpload.files[0];
    const isValid = this.validate(file);
    if (isValid) {
      this.reader.readAsDataURL(file);
    } else {
      file = null;
      this.setState({
        previewSrc: null,
      });
    }
    this.setState({
      //todo: not sure about null
      validationResult: (isValid ? 'success' : null),
      dirty: true,
    }, () => onChange(file));
  }

  render() {
    const { imgSrc, serverError, className } = this.props;
    const { previewSrc, dirty } = this.state;
    const imageToShow = previewSrc || imgSrc;
    let validationResult = null;
    if (dirty) {
      validationResult = this.state.validationResult;
    } else if (serverError) {
      validationResult = 'error';
    }
    const wrapperClassName = `${styles.wrapper} ${className} ${validationResult?styles[validationResult]:''}`;
    return (
      <div className={wrapperClassName}>
        {imageToShow ?
          <img
            src={imageToShow}
            className={styles.preview}
          />
        :
          <div className={styles.placeholder} />
        }
        <input
          type="file"
          accept="image/*"
          onChange={this.onChange}
          ref={ref => (this.fileUpload = ref)}
        />
      </div>
    );
  }
}

FileUpload.propTypes = {
  imgSrc: PropTypes.string,
  serverError: PropTypes.bool,
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  stateKey: PropTypes.string,
};

export default FileUpload;
