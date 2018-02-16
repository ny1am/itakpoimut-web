import scrollIntoView from 'dom-scroll-into-view';

//todo: investigate why it's not working for dialogs
const scrollIntoViewIfNeeded = (element) => {
  scrollIntoView(element, window, {
    alignWithTop: true,
    onlyScrollIfNeeded: true
  });
};

export default scrollIntoViewIfNeeded;
