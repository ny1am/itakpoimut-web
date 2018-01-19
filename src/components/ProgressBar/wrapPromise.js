import Progress from 'react-progress-2';

const wrapPromise = (promise) => {
  try {
    Progress.show();
  } catch(e) {
    // do nothing; todo: use another lib for a progress component
  }
  return promise.finally(() => {
    Progress.hide();
  });
};

export default wrapPromise;
