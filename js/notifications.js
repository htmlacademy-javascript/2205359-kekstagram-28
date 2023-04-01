const ALERT_SHOW_TIME = 5000;
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorFragment = document.createDocumentFragment();
const successFragment = document.createDocumentFragment();

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.opacity = '0.8';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const onDocumentKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    closeAlert();
  }
};

function closeAlert (fragment) {
  fragment.remove();
  document.removeEventListener('keydown', onDocumentKeyDown);
}

const showUploadAlert = (template, fragment) => {
  const newAlert = template.cloneNode(true);
  fragment.append(newAlert);
  document.body.append(fragment);
  const fragmentButton = fragment.querySelector('button');
  const fragmentOverlay = fragment.querySelector('div');
  fragmentButton.addEventListener('click', () => {
    closeAlert(fragment);
  });
  fragmentOverlay.addEventListener('click', () => {
    closeAlert(fragment);
  });
  document.addEventListener('keydown', onDocumentKeyDown);
};

const showSuccessAlert = () => showUploadAlert(successTemplate, successFragment);
const showErrorAlert = () => showUploadAlert(errorTemplate, errorFragment);


export {showAlert, showErrorAlert, showSuccessAlert};
