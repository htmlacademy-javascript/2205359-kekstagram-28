import {validateForm} from './validate-form.js';
import { extractDigits } from './string-util.js';
import {sliderFieldset, createSlider, onEffectsListClick, destroySlider} from './form-sliders.js';

const MIN_SCALE_AMOUNT = 25;
const MAX_SCALE_AMOUNT = 100;
const SCALE_STEP = 25;

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const imgUploadInput = uploadForm.querySelector('.img-upload__input');
const closeFormBtn = uploadForm.querySelector('.img-upload__cancel');
const scaleControlValue = uploadForm.querySelector('.scale__control--value');
const scaleControls = uploadForm.querySelector('.img-upload__scale');
const imgUploadContainer = uploadForm.querySelector('.img-upload__preview');
const imgUploadPrewiev = imgUploadContainer.querySelector('img');
const effectsList = uploadForm.querySelector('.effects__list');

const onScaleControlsClick = (evt) => {
  if (evt.target.closest('.scale__control--smaller') && extractDigits(scaleControlValue.value) > MIN_SCALE_AMOUNT) {
    scaleControlValue.value = `${extractDigits(scaleControlValue.value) - SCALE_STEP}%`;
    imgUploadPrewiev.style.transform = `scale(${extractDigits(scaleControlValue.value) / 100})`;
  }
  if (evt.target.closest('.scale__control--bigger') && extractDigits(scaleControlValue.value) < MAX_SCALE_AMOUNT) {
    scaleControlValue.value = `${extractDigits(scaleControlValue.value) + SCALE_STEP}%`;
    imgUploadPrewiev.style.transform = `scale(${extractDigits(scaleControlValue.value) / 100})`;
  }
};

const onFormSubmit = (evt) => validateForm() ? imgUploadClose() : evt.preventDefault();

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !evt.target.closest('.text__hashtags') && !evt.target.closest ('.text__description')) {
    imgUploadClose();
  }
};

function onImageUpload () {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  sliderFieldset.classList.add('hidden');
  createSlider();
  scaleControls.addEventListener('click', onScaleControlsClick);
  effectsList.addEventListener('change', onEffectsListClick);
  uploadForm.addEventListener('submit', onFormSubmit);
  closeFormBtn.addEventListener('click', imgUploadClose);
  document.addEventListener('keydown', onDocumentKeydown);
}

function imgUploadClose () {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  uploadForm.reset();
  imgUploadPrewiev.style.transform = 'scale(1)';
  imgUploadPrewiev.style.filter = '';
  imgUploadPrewiev.removeAttribute('class');
  destroySlider();
  scaleControls.removeEventListener('click', onScaleControlsClick);
  effectsList.removeEventListener('change', onEffectsListClick);
  uploadForm.removeEventListener('submit', onFormSubmit);
  closeFormBtn.removeEventListener('click', imgUploadClose);
  document.removeEventListener('keydown', onDocumentKeydown);
}

imgUploadInput.addEventListener('change', onImageUpload);

export {imgUploadPrewiev, uploadForm};
