import {findDuplicates} from './util.js';
import {checkStringLength} from './string-util.js';

const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENT_LENGTH = 140;

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const imgUploadInput = uploadForm.querySelector('.img-upload__input');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const closeFormBtn = uploadForm.querySelector('.img-upload__cancel');

const onImageUpload = () => {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
};

imgUploadInput.addEventListener('change', onImageUpload);

const onUploadCancel = () => {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  imgUploadInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
};

const testHashtag = (value) => HASHTAG_REGEXP.test(value);

const checkHashtag = (str) => {
  const hashtag = str.trim();
  if (hashtag.split(' ').length > 5 || findDuplicates(hashtag.toLowerCase().split(' ')).length > 0) {
    return false;
  }
  if (hashtag.split(' ').every(testHashtag)) {
    return true;
  }
  return false;
};

const checkComment = (str) => checkStringLength(str, MAX_COMMENT_LENGTH);

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__text',
});

pristine.addValidator(
  hashtagInput, checkHashtag, 'Проверьте правильность введенных данных'
);

pristine.addValidator(
  commentInput, checkComment, 'Комментарий не может быть длиннее 140 символов'
);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

