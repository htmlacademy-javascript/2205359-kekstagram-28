import {validateForm} from './validate-form.js';
import { extractDigits } from './string-util.js';
import {sliderFieldset, createSlider, onEffectsListClick, destroySlider} from './form-sliders.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const imgUploadInput = uploadForm.querySelector('.img-upload__input');
const closeFormBtn = uploadForm.querySelector('.img-upload__cancel');

const scaleControlValue = uploadForm.querySelector('.scale__control--value');
const scaleDownBtn = uploadForm.querySelector('.scale__control--smaller');
const scaleUpBtn = uploadForm.querySelector('.scale__control--bigger');
const imgUploadContainer = uploadForm.querySelector('.img-upload__preview');
const imgUploadPrewiev = imgUploadContainer.querySelector('img');
const effectsList = uploadForm.querySelector('.effects__list');

const onScaleDownClick = () => {
  if (extractDigits(scaleControlValue.value) > 25) {
    scaleControlValue.value = `${extractDigits(scaleControlValue.value) - 25}%`;
    imgUploadPrewiev.style.transform = `scale(${extractDigits(scaleControlValue.value) / 100})`;
  }
};

const onScaleUpClick = () => {
  if (extractDigits(scaleControlValue.value) < 100) {
    scaleControlValue.value = `${extractDigits(scaleControlValue.value) + 25}%`;
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
  scaleDownBtn.addEventListener('click', onScaleDownClick);
  scaleUpBtn.addEventListener('click', onScaleUpClick);
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
  scaleDownBtn.removeEventListener('click', onScaleDownClick);
  scaleUpBtn.removeEventListener('click', onScaleUpClick);
  effectsList.removeEventListener('change', onEffectsListClick);
  uploadForm.removeEventListener('submit', onFormSubmit);
  closeFormBtn.removeEventListener('click', imgUploadClose);
  document.removeEventListener('keydown', onDocumentKeydown);
}

imgUploadInput.addEventListener('change', onImageUpload);

export {imgUploadPrewiev, uploadForm};
