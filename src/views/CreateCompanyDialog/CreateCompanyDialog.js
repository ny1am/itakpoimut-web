import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import styles from './styles.scss';

class CreateCompanyDialog extends React.Component {

  constructor(props) {
    super(props);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleViolationChange = this.handleViolationChange.bind(this);
    this.state = {
      selectedCategories: [],
      selectedViolations: [],
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

  renderDialogError() {
    const errors = this.props.errors || {};
    if (errors.dialog) {
      return (
        <div className="dialog-error">
          {errors.dialog}
        </div>
      );
    } else {
      return null;
    }
  }
  render() {
    const errors = this.props.errors || {};
    const attachmentClass = errors.attachment?'fu-error':'';
    const titleClass = errors.title?'row--error':'';
    const descriptionClass = errors.description?'row--error':'';
    const company_siteClass = errors.company_site?'row--error':'';
    return (
      <div className={`dialog_content ${styles.wrapper}`}>
        <h1 className="dialog__h1">
          Запропонувати компанію
        </h1>
        {this.renderDialogError()}
        <p>
          Зазначимо, що ви тільки пропонуєте компанію на розгляд. Після того її затверджує модератор, і система сама присвоює компанії статус лояльної/порушника на основі наявності/відсутності порушень.
        </p>
        <form action="/createCompany" method="post" encType="multipart/form-data">
          <div className="row--logo">
            <div className="company-attachment-h">
              <label className="row__label">
                Лого компанії
              </label>
              <div className={"company-attachment "+attachmentClass}>
                <input type="file" name="attachment" title="Завантажте лого"/>
              </div>
              <div className="hint">
                JPEG або PNG,<br/> розміром до 1 Mb
              </div>
            </div>
            <div>
              <div className={"row "+titleClass}>
                <label className="row__label" htmlFor="title">
                  {errors.title || 'Назва компанії'}
                </label>
                <input className="row__input" type="text" name="title" defaultValue={this.props.title||''} maxLength="300" />
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
                <textarea className="row__input" name="description" maxLength="300" defaultValue={this.props.description||''}></textarea>
              </div>
              <div className={"row "+company_siteClass}>
                <label className="row__label" htmlFor="company_site">
                  {errors.company_site || 'Посилання на сайт (якщо є)'}
                </label>
                <div className="http">
                  <input className="http" type="text" name="company_site" maxLength="100" defaultValue={this.props.company_site||''} />
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
          <div className="right-content">
            <button className="dialog__button" type="submit" data-ajax-submit-dialog="createCompany">Додати</button>
          </div>
        </form>
      </div>
    );
  }
}

CreateCompanyDialog.propTypes = {
  errors: PropTypes.object,
  categoriesList: PropTypes.array,
  violationsList: PropTypes.array,
  selectedCategories: PropTypes.array,
  selectedViolations: PropTypes.array,
};

CreateCompanyDialog.defaultProps = {
  errors: {},
  selectedCategories: [],
  selectedViolations: []
};

export default CreateCompanyDialog;
