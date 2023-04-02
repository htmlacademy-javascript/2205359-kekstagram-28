const errorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;
const successSection = document.querySelector('.success');
const errorSection = document.querySelector('.error');

const onOverlayKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeAlert();
  }
};

function closeAlert () {
  if (successSection) {
    successSection.remove();
  }
  if (errorSection) {
    errorSection.remove();
  }
  document.removeEventListener('keydown', onOverlayKeydown);
}

const showUploadAlert = (template) => {
  const newAlert = template.cloneNode(true);
  newAlert.querySelector('button').addEventListener('click', closeAlert);
  newAlert.querySelector('div').addEventListener('click', closeAlert);
  document.addEventListener('keydown', onOverlayKeydown);
  document.body.append(newAlert);
};

const showSuccessAlert = () => showUploadAlert(successTemplate);


const showErrorAlert = () => showUploadAlert(errorTemplate);


export {showErrorAlert, showSuccessAlert};
