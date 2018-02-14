import React from 'react';

import SuccessDialogComponent from 'components/SuccessDialog';

const SuccessDialog = () => (
  <SuccessDialogComponent
    title="Запит надіслано"
    body="Запит на зміну паролю надіслано. &#13;&#10; Перевірте, будь ласка, поштову скриньку."
  />
);

export default SuccessDialog;
