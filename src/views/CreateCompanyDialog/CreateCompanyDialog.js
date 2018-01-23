import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import FileUpload from 'components/FileUpload';

import styles from './styles.scss';

class CreateCompanyDialog extends React.Component {

  constructor(props) {
    super(props);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleViolationChange = this.handleViolationChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleCompanySiteChange = this.handleCompanySiteChange.bind(this);
    this.handleAttachment = this.handleAttachment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      title: '',
      description: '',
      company_site: '',
      selectedCategories: [],
      selectedViolations: [],
      attachment: null,
    };
  }

  handleCategoryChange(value) {
    this.setState({
      selectedCategories: value,
    });
  }

  handleViolationChange(value) {
    this.setState({
      selectedViolations: value,
    });
  }

  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
  }

  handleDescriptionChange(e) {
    const description = e.target.value;
    this.setState({ description });
  }

  handleCompanySiteChange(e) {
    const company_site = e.target.value;
    this.setState({ company_site });
  }

  handleAttachment(attachment) {
    this.setState({ attachment });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { selectedCategories, selectedViolations, ...rest } = this.state;
    const data = {
      ...rest,
      selectedCategories: selectedCategories.map(item => item.value),
      selectedViolations: selectedViolations.map(item => item.value),
    };
    this.props.onSubmit(data);
  }

  renderDialogError() {
    const errors = this.props.errors || {};
    if (errors.dialog) {
      return (
        <div className={styles.error}>
          {errors.dialog}
        </div>
      );
    } else {
      return null;
    }
  }
  render() {
    const errors = this.props.errors || {};
    const titleClass = errors.title?'row--error':'';
    const descriptionClass = errors.description?'row--error':'';
    const company_siteClass = errors.company_site?'row--error':'';
    return (
      <div className={`dialog_content ${styles.wrapper}`}>
        <h1>
          Запропонувати компанію
        </h1>
        {this.renderDialogError()}
        <p>
          Зазначимо, що ви тільки пропонуєте компанію на розгляд. Після того її затверджує модератор, і система сама присвоює компанії статус лояльної/порушника на основі наявності/відсутності порушень.
        </p>
        <form action="/createCompany" method="post" encType="multipart/form-data" onSubmit={this.handleSubmit}>
          <div className={styles.logoRow}>
            <div className={styles.attachmentWrapper}>
              <label className="row__label">
                Лого компанії
              </label>
              <FileUpload className={styles.attachment} error={!!errors.attachment} onChange={this.handleAttachment} />
              <div className="hint">
                JPEG або PNG,<br/> розміром до 1 Mb
              </div>
            </div>
            <div>
              <div className={"row "+titleClass}>
                <label className="row__label" htmlFor="title">
                  {errors.title || 'Назва компанії'}
                </label>
                <input type="text"
                  className="row__input"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleTitleChange}
                  maxLength="300"
                />
              </div>
              <div className="row">
                <label className="row__label" htmlFor="selectedCategories[]">
                  Оберіть сфери компанії
                </label>
                <Select name="selectedCategories[]"
                  className="row__input"
                  multi={true}
                  placeholder="Оберіть зі списку..."
                  backspaceRemoves={false}
                  value={this.state.selectedCategories}
                  onChange={this.handleCategoryChange}
                  options={this.props.categoriesList.map(item =>({label: item.text, value: item.name}))}
                />
              </div>
              <div className={"row "+descriptionClass}>
                <label className="row__label" htmlFor="description">
                  {errors.description || 'Опис компанії'}
                </label>
                <textarea
                  className="row__input"
                  name="description"
                  maxLength="300"
                  value={this.state.description}
                  onChange={this.handleDescriptionChange}
                />
              </div>
              <div className={"row "+company_siteClass}>
                <label className="row__label" htmlFor="company_site">
                  {errors.company_site || 'Посилання на сайт (якщо є)'}
                </label>
                <div className={styles.httpWrapper}>
                  <input type="text"
                    className={styles.http}
                    name="company_site"
                    maxLength="100"
                    value={this.state.company_site}
                    onChange={this.handleCompanySiteChange}
                  />
                </div>
              </div>
              <div className="row">
                <label className="row__label" htmlFor="selectedViolations[]">
                  Оберіть порушення компанії
                </label>
                <Select name="selectedViolations[]"
                  className="row__input"
                  multi={true}
                  placeholder="Оберіть зі списку..."
                  backspaceRemoves={false}
                  value={this.state.selectedViolations}
                  onChange={this.handleViolationChange}
                  options={this.props.violationsList.map(item =>({label: item.text, value: item.name}))}
                />
              </div>
            </div>
          </div>
          <div className={styles.actions}>
            <button className="dialog__button" type="submit">Додати</button>
          </div>
        </form>
      </div>
    );
  }
}

CreateCompanyDialog.propTypes = {
  errors: PropTypes.object,
  categoriesList: PropTypes.array.isRequired,
  violationsList: PropTypes.array.isRequired,
  selectedCategories: PropTypes.array,
  selectedViolations: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
};

CreateCompanyDialog.defaultProps = {
  errors: {},
  selectedCategories: [],
  selectedViolations: []
};

export default CreateCompanyDialog;
