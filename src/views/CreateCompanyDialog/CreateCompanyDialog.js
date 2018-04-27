import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import randomstring from 'randomstring';
import cn from 'classnames';
import { Helmet } from 'react-helmet';

import FileUpload from 'components/FileUpload';
import UrlInput from 'components/UrlInput';
import Textarea from 'components/Textarea';

import { preventDefault } from 'utils';

import styles from './styles.scss';

class CreateCompanyDialog extends React.PureComponent {
  state = {
    title: '',
    description: '',
    company_site: '',
    selectedCategories: [],
    selectedViolations: [],
    attachment: null,
    submitKey: randomstring.generate(7),
  };

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleCategoryChange = (value) => {
    this.setState({
      selectedCategories: value,
    });
  };

  handleViolationChange = (value) => {
    this.setState({
      selectedViolations: value,
    });
  };

  handleAttachment = (attachment) => {
    this.setState({ attachment });
  };

  handleSubmit = () => {
    const { selectedCategories, selectedViolations, ...rest } = this.state;
    const data = {
      ...rest,
      selectedCategories: selectedCategories.map((item) => item.value),
      selectedViolations: selectedViolations.map((item) => item.value),
    };
    this.props.onSubmit(data).finally(() => {
      this.setState({ submitKey: randomstring.generate(7) });
    });
  };

  render() {
    const { errors = {} } = this.props;
    const { categoriesList, violationsList } = this.props.initialData;
    const { submitKey } = this.state;
    const onSubmit = preventDefault(this.handleSubmit);
    return (
      <React.Fragment>
        <Helmet>
          <title>Запропонувати компанію</title>
        </Helmet>
        <div className={cn('dialog_content', styles.wrapper)}>
          <h1>Запропонувати компанію</h1>
          {errors.dialog && <div className={styles.error}>{errors.dialog}</div>}
          <p>
            Зазначимо, що ви тільки пропонуєте компанію на розгляд. Після того
            її затверджує модератор, і система сама присвоює компанії статус
            лояльної/порушника на основі наявності/відсутності порушень.
          </p>
          <form
            action="/createCompany"
            method="post"
            encType="multipart/form-data"
            onSubmit={onSubmit}
          >
            <div className={styles.logoRow}>
              <div className={styles.attachmentWrapper}>
                <label className="row__label">Лого компанії</label>
                <FileUpload
                  className={styles.attachment}
                  serverError={!!errors.attachment}
                  onChange={this.handleAttachment}
                  stateKey={submitKey}
                />
                <div className="hint">
                  JPEG або PNG,<br /> розміром до 1 Mb
                </div>
              </div>
              <div>
                <div className={cn('row', { 'row--error': errors.title })}>
                  <label className="row__label" htmlFor="title">
                    {errors.title || 'Назва компанії'}
                  </label>
                  <input
                    type="text"
                    className="row__input"
                    name="title"
                    value={this.state.title}
                    onChange={this.onInputChange}
                    maxLength="300"
                  />
                </div>
                <div className="row">
                  <label className="row__label" htmlFor="selectedCategories[]">
                    Оберіть сфери компанії
                  </label>
                  <Select
                    name="selectedCategories[]"
                    className="row__input"
                    multi={true}
                    placeholder="Оберіть зі списку..."
                    backspaceRemoves={false}
                    value={this.state.selectedCategories}
                    onChange={this.handleCategoryChange}
                    options={categoriesList.map((item) => ({
                      label: item.text,
                      value: item.name,
                    }))}
                  />
                </div>
                <div
                  className={cn('row', { 'row--error': errors.description })}
                >
                  <label className="row__label" htmlFor="description">
                    {errors.description || 'Опис компанії'}
                  </label>
                  <Textarea
                    className="row__input"
                    name="description"
                    maxLength={300}
                    value={this.state.description}
                    onChange={this.onInputChange}
                  />
                </div>
                <div
                  className={cn('row', { 'row--error': errors.company_site })}
                >
                  <label className="row__label" htmlFor="company_site">
                    {errors.company_site || 'Посилання на сайт (якщо є)'}
                  </label>
                  <UrlInput
                    name="company_site"
                    maxLength="100"
                    value={this.state.company_site}
                    onChange={this.onInputChange}
                  />
                </div>
                <div className="row">
                  <label className="row__label" htmlFor="selectedViolations[]">
                    Оберіть порушення компанії
                  </label>
                  <Select
                    name="selectedViolations[]"
                    className="row__input"
                    multi={true}
                    placeholder="Оберіть зі списку..."
                    backspaceRemoves={false}
                    value={this.state.selectedViolations}
                    onChange={this.handleViolationChange}
                    options={violationsList.map((item) => ({
                      label: item.text,
                      value: item.name,
                    }))}
                  />
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              <button className="dialog__button" type="submit">
                Додати
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

CreateCompanyDialog.propTypes = {
  errors: PropTypes.object,
  initialData: PropTypes.shape({
    categoriesList: PropTypes.array.isRequired,
    violationsList: PropTypes.array.isRequired,
  }).isRequired,
  selectedCategories: PropTypes.array,
  selectedViolations: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
};

CreateCompanyDialog.defaultProps = {
  selectedCategories: [],
  selectedViolations: [],
};

export default CreateCompanyDialog;
