import {isEscapeKey} from './util.js';
import {onLoaderClick, commentsCounter} from './render-pictures.js';

const body = document.querySelector('body');
const fullPicture = body.querySelector('.big-picture');
const fullPictureImg = fullPicture.querySelector('.big-picture__img');
const likes = fullPicture.querySelector('.likes-count');
const fullPictureCaption = fullPicture.querySelector('.social__caption');
const commentsCount = fullPicture.querySelector('.comments-count');
const commentsLoader = fullPicture.querySelector('.comments-loader');
const closeBtn = fullPicture.querySelector('.big-picture__cancel');
const commentsList = fullPicture.querySelector('.social__comments');
const comment = commentsList.querySelector('.social__comment');

let commentsStep = 5;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSize(evt);
  }
};

const onCloseBtnClick = (evt) => closeFullSize(evt);

const openFullSize = () => {
  fullPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  closeBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', onLoaderClick);
};

// генерация информации по каждому фото
const renderFullSize = (obj) => {
  fullPictureImg.querySelector('img').src = obj.url;
  likes.textContent = obj.likes;
  commentsCount.textContent = obj.comments.length;
  fullPictureCaption.textContent = obj.description;
};


// генерация комментариев
const renderComments = (commentsArray) => {
  commentsArray.forEach((comm) => {
    const newComment = comment.cloneNode(true);
    newComment.querySelector('.social__picture').src = comm.avatar;
    newComment.querySelector('.social__picture').alt = comm.name;
    newComment.querySelector('.social__text').textContent = comm.message;
    commentsList.append(newComment);
  });
};

const addComments = (commentsArray) => {
  commentsList.innerHTML = '';
  const commentsToAdd = commentsArray.slice(0, commentsStep);
  renderComments(commentsToAdd);
};

const loadComments = (obj) => {
  commentsStep += 5;
  renderComments(obj.slice(commentsList.children.length, commentsStep));
};

function closeFullSize (evt) {
  evt.preventDefault();
  fullPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  closeBtn.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsStep = 5;
  commentsLoader.removeEventListener('click', onLoaderClick);
  commentsLoader.classList.remove('hidden');
  commentsCounter.innerHTML = '';
}

export {openFullSize, renderFullSize, addComments, loadComments, commentsList};
