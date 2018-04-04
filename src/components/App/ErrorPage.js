import React from 'react';

import { PageLayout } from 'components/Page';
import SomethingWrongPage from 'views/SomethingWrongPage';
import { history } from '../../store/configureStore';

//todo: revise this
class ErrorPage extends React.PureComponent {

  componentDidMount() {
    history.listen(() => {
      window.location.reload();
    });
  }

  render() {
    return (
      <PageLayout>
        <SomethingWrongPage />
      </PageLayout>
    );
  }
}

export default ErrorPage;
