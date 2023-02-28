import {isEscapeKey} from './util.js';

const BODY = document.querySelector('body');
const BIG_PICTURE = BODY.querySelector('.big-picture');
const BIG_PICTURE_IMG = BIG_PICTURE.querySelector('.big-picture__img');
const LIKES = BIG_PICTURE.querySelector('.likes-count');
const PICTURE_CAPTION = BIG_PICTURE.querySelector('.social__caption');
const COMMENTS_COUNT = BIG_PICTURE.querySelector('.comments-count');
const COMMENTS_LIST = BIG_PICTURE.querySelector('.social__comments');
const COMMENT = COMMENTS_LIST.querySelector('.social__comment');
const COMMENTS_COUNTER = BIG_PICTURE.querySelector('.social__comment-count');
const COMMENTS_LOADER = BIG_PICTURE.querySelector('.comments-loader');
const CLOSE_BTN = BIG_PICTURE.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSize(evt);
  }
};

// делегирование общих событий по открытию превью
const openFullSize = (evt) => {
  evt.preventDefault();
  if (evt.target.closest('.picture')) {
    BIG_PICTURE.classList.remove('hidden');
    BODY.classList.add('modal-open');
    COMMENTS_COUNTER.classList.add('hidden');
    COMMENTS_LOADER.classList.add('hidden');
    CLOSE_BTN.addEventListener('click', closeFullSize);
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

// генерация инфы по каждому фото
const renderFullSize = (obj) => {
  BIG_PICTURE_IMG.querySelector('img').src = obj.url;
  LIKES.textContent = obj.likes;
  COMMENTS_COUNT.textContent = obj.comments.length;
  PICTURE_CAPTION.textContent = obj.description;
};

// генерация комментариев
const renderComments = (obj) => {
  COMMENTS_LIST.innerHTML = '';
  obj.comments.forEach((comment) => {
    const newComment = COMMENT.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    COMMENTS_LIST.append(newComment);
  });
};

function closeFullSize (evt) {
  evt.preventDefault();
  BIG_PICTURE.classList.add('hidden');
  BODY.classList.remove('modal-open');
  CLOSE_BTN.removeEventListener('click', closeFullSize);
  document.removeEventListener('keydown', onDocumentKeydown);
}

export {openFullSize, renderFullSize, renderComments};
