import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;
const errorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;

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

const onOverlayKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeAlert();
  }
};

const onOverlayClick = (evt) => {
  if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    closeAlert();
  }
};

const onAlertButtonClick = () => closeAlert();

const showUploadAlert = (template) => {
  const newAlert = template.cloneNode(true);
  document.body.append(newAlert);
};

const showSuccessAlert = () => {
  showUploadAlert(successTemplate);
  document.querySelector('.success__button').focus();
  document.querySelector('.success__button').addEventListener('click', onAlertButtonClick);
  document.querySelector('.success').addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onOverlayKeydown);
};

const showErrorAlert = () => {
  showUploadAlert(errorTemplate);
  document.querySelector('.error__button').addEventListener('click', onAlertButtonClick);
  document.querySelector('.error').addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onOverlayKeydown);
};

function closeAlert() {
  if (document.querySelector('.success')) {
    document.querySelector('.success').remove();
  }
  if (document.querySelector('.error')) {
    document.querySelector('.error').remove();
  }
  document.removeEventListener('keydown', onOverlayKeydown);
}


export {showAlert, showErrorAlert, showSuccessAlert};
