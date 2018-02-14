import React from 'react';

import SuccessDialogComponent from 'components/SuccessDialog';

const SuccessDialog = () => (
  <SuccessDialogComponent title="Запит надіслано">
    <p>Запит на зміну паролю надіслано. <br/> Перевірте, будь ласка, поштову скриньку.</p>
  </SuccessDialogComponent>
);

export default SuccessDialog;
