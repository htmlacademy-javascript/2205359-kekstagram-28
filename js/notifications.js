const errorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;

const onOverlayKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeMessage();
  }
};

const onOverlayClick = (evt) => {
  if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    closeMessage();
  }
};

const onAlertButtonClick = () => closeMessage();

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

function closeMessage() {
  if (document.querySelector('.success')) {
    document.querySelector('.success').remove();
  }
  if (document.querySelector('.error')) {
    document.querySelector('.error').remove();
  }
  document.removeEventListener('keydown', onOverlayKeydown);
}


export {showErrorAlert, showSuccessAlert};
