import {validateForm} from './validate-form.js';
import { extractDigits } from './string-util.js';
import {sliderFieldset, createSlider, onEffectsListClick, destroySlider} from './form-sliders.js';
import { sendData } from './server-data.js';
import {showErrorAlert, showSuccessAlert} from './notifications.js';
import { isEscapeKey } from './util.js';

const MIN_SCALE_AMOUNT = 25;
const MAX_SCALE_AMOUNT = 100;
const SCALE_STEP = 25;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const imgUploadInput = uploadForm.querySelector('.img-upload__input');
const closeFormBtn = uploadForm.querySelector('.img-upload__cancel');
const scaleControlValue = uploadForm.querySelector('.scale__control--value');
const scaleControls = uploadForm.querySelector('.img-upload__scale');
const imgUploadContainer = uploadForm.querySelector('.img-upload__preview');
const imgUploadPrewiev = imgUploadContainer.querySelector('img');
const effectsList = uploadForm.querySelector('.effects__list');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const onScaleControlsClick = (evt) => {
  if (evt.target.closest('.scale__control--smaller') && extractDigits(scaleControlValue.value) > MIN_SCALE_AMOUNT) {
    scaleControlValue.value = `${extractDigits(scaleControlValue.value) - SCALE_STEP}%`;
  }
  if (evt.target.closest('.scale__control--bigger') && extractDigits(scaleControlValue.value) < MAX_SCALE_AMOUNT) {
    scaleControlValue.value = `${extractDigits(scaleControlValue.value) + SCALE_STEP}%`;
  }
  imgUploadPrewiev.style.transform = `scale(${extractDigits(scaleControlValue.value) / 100})`;
};

const resetForm = () => {
  uploadForm.reset();
  imgUploadPrewiev.style.transform = 'scale(1)';
  imgUploadPrewiev.style.filter = '';
  imgUploadPrewiev.removeAttribute('class');
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (validateForm()) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        imgUploadClose();
        resetForm();
        showSuccessAlert();
      })
      .catch(() => {
        showErrorAlert();
      })
      .finally(unblockSubmitButton);
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !evt.target.closest('.text__hashtags') && !evt.target.closest ('.text__description')) {
    resetForm();
    imgUploadClose();
  }
};

const uploadFile = () => {
  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgUploadPrewiev.src = URL.createObjectURL(file);
  }
};

function onImageUpload () {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  sliderFieldset.classList.add('hidden');
  createSlider();
  uploadFile();
  scaleControls.addEventListener('click', onScaleControlsClick);
  effectsList.addEventListener('change', onEffectsListClick);
  uploadForm.addEventListener('submit', onFormSubmit);
  closeFormBtn.addEventListener('click', imgUploadClose);
  closeFormBtn.addEventListener('click', resetForm);
  document.addEventListener('keydown', onDocumentKeydown);
}

function imgUploadClose () {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  destroySlider();
  scaleControls.removeEventListener('click', onScaleControlsClick);
  effectsList.removeEventListener('change', onEffectsListClick);
  uploadForm.removeEventListener('submit', onFormSubmit);
  closeFormBtn.removeEventListener('click', imgUploadClose);
  document.removeEventListener('keydown', onDocumentKeydown);
}

imgUploadInput.addEventListener('change', onImageUpload);

export {imgUploadPrewiev, uploadForm};
