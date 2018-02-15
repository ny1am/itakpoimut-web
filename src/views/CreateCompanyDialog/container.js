import React from 'react';

import { get as getCategories } from 'actions/category';
import { get as getViolations } from 'actions/violation';
import { save } from 'actions/createCompany';
import { enhanceDialog } from 'components/Dialog';

import CreateCompanyDialogComponent from './CreateCompanyDialog';
import SuccessView from './SuccessView';

class CreateCompanyDialogContainer extends React.Component {

  static fetch(location, { dispatch }) {
    return [{
      prop: 'categoriesList',
      promise: dispatch(getCategories())
    }, {
      prop: 'violationsList',
      promise: dispatch(getViolations())
    }];
  }

  render() {
    return <CreateCompanyDialogComponent {...this.props} />;
  }
}

const mapProps = (dispatch) => ({
  onSubmit: (params) => dispatch(save(params)),
  SuccessView,
});

export default enhanceDialog(mapProps)(
  CreateCompanyDialogContainer
);
