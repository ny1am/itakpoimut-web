import React from 'react';
import PropTypes from 'prop-types';

class FileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      result: null,
    };
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.error && newProps.error) {
      this.setState({
        result: 'error',
      });
    }
  }

  onChange() {
    let file = this.fileUpload.files[0];
    //validation for drag and drop
    if (file && file.type.indexOf('image/') !== 0) {
      file = null;
    }
    if (file) {
      this.setState({ result: 'success' });
    } else {
      this.setState({ result: null });
    }
    this.props.onChange(file);
  }

  render() {
    const className = `company-attachment ${this.state.result?`fu-${this.state.result}`:''}`;
    return (
      <div className={className}>
        <input type="file" accept="image/*" onChange={this.onChange} ref={(ref) => this.fileUpload = ref} />
      </div>
    );
  }
}

FileUpload.propTypes = {
  error: PropTypes.bool,
  /**
   * change callback
   */
  onChange: PropTypes.func.isRequired,
};

export default FileUpload;
