import {findDuplicates} from './util.js';
import {checkStringLength} from './string-util.js';

const HASHTAG_REGEXP = /^#[a-zа-яё0-9]+$/i;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_AMOUNT = 5;
const MAX_HASHTAG_LENGTH = 20;


const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const testHashtag = (value) => HASHTAG_REGEXP.test(value);

const checkHashtagAmount = (str) => str.trim().split(' ').length <= MAX_HASHTAG_AMOUNT;

const findHashtagDuplicates = (str) => findDuplicates(str.trim().toLowerCase().split(' '));

const testHashtagValue = (str) => str.trim().split(' ').every(testHashtag);

const testHashtagLength = (str) => str.trim().split(' ').every((el) => el.length <= MAX_HASHTAG_LENGTH);

const checkComment = (str) => checkStringLength(str, MAX_COMMENT_LENGTH);

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__text',
});

pristine.addValidator(
  hashtagInput, checkHashtagAmount, 'Нельзя указать более пяти хэш-тегов'
);

pristine.addValidator(
  hashtagInput, findHashtagDuplicates, 'Хэш-теги не должны повторяться'
);

pristine.addValidator(
  hashtagInput, testHashtagValue, 'Cтрока после решётки должна состоять из букв и чисел и не должна состоять из одной решетки'
);

pristine.addValidator(
  hashtagInput, testHashtagLength, 'Хэш-тег не может быть длиннее 20 символов'
);

pristine.addValidator(
  commentInput, checkComment, 'Комментарий не может быть длиннее 140 символов'
);

const validateForm = () => pristine.validate();

export {validateForm};
