import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const fullPicture = body.querySelector('.big-picture');
const fullPictureImg = fullPicture.querySelector('.big-picture__img');
const likes = fullPicture.querySelector('.likes-count');
const fullPictureCaption = fullPicture.querySelector('.social__caption');
const commentsCount = fullPicture.querySelector('.comments-count');
const commentsCounter = fullPicture.querySelector('.social__comment-count');
const commentsLoader = fullPicture.querySelector('.comments-loader');
const closeBtn = fullPicture.querySelector('.big-picture__cancel');
const commentsList = fullPicture.querySelector('.social__comments');
const comment = commentsList.querySelector('.social__comment');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSize(evt);
  }
};

const openFullSize = () => {
  fullPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  closeBtn.addEventListener('click', closeFullSize);
  document.addEventListener('keydown', onDocumentKeydown);
};

// генерация информации по каждому фото
const renderFullSize = (obj) => {
  fullPictureImg.querySelector('img').src = obj.url;
  likes.textContent = obj.likes;
  commentsCount.textContent = obj.comments.length;
  fullPictureCaption.textContent = obj.description;
};

// генерация комментариев
const renderComments = (obj) => {
  commentsList.innerHTML = '';
  obj.comments.forEach((comm) => {
    const newComment = comment.cloneNode(true);
    newComment.querySelector('.social__picture').src = comm.avatar;
    newComment.querySelector('.social__picture').alt = comm.name;
    newComment.querySelector('.social__text').textContent = comm.message;
    commentsList.append(newComment);
  });
};

function closeFullSize (evt) {
  evt.preventDefault();
  fullPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  closeBtn.removeEventListener('click', closeFullSize);
  document.removeEventListener('keydown', onDocumentKeydown);
}

export {openFullSize, renderFullSize, renderComments};
