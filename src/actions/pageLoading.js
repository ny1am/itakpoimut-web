import Progress from 'react-progress-2';

/**
 * Starts progress
 */
export function start() {
  try {
    Progress.show();
  } catch(e){console.log(e)}
}

/**
 * Ends progress
 */
export function end() {
  Progress.hide();
}
