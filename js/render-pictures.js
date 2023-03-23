import {openFullSize, renderFullSize, addComments, loadComments, commentsList} from './render-fullsize.js';
import {generateDescriptions} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const generatedPictures = generateDescriptions();

const commentsCounter = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

let addedComments = [];

// отображение миниатюр на странице
const addPictures = () => {
  generatedPictures.forEach((obj) => {
    //генерация фото-превью
    const newPicture = pictureTemplate.cloneNode(true); //
    newPicture.querySelector('.picture__img').src = obj.url;
    newPicture.querySelector('.picture__likes').textContent = obj.likes;
    newPicture.querySelector('.picture__comments').textContent = obj.comments.length;
    newPicture.dataset.id = obj.id;
    fragment.append(newPicture);
  });
  picturesContainer.append(fragment);
};

const onPictureListClick = (evt) => {
  if (evt.target.closest('.picture')) {
    openFullSize();
    const currentElement = evt.target.closest('.picture');
    const currentObject = generatedPictures.find((el) => el.id === Number(currentElement.dataset.id));
    renderFullSize(currentObject);
    const comments = currentObject.comments;
    addedComments = addedComments.concat(comments);
    addComments(comments);
    if (commentsList.children.length === currentObject.comments.length) {
      commentsLoader.classList.add('hidden');
      addedComments = [];
    }
    commentsCounter.innerHTML = `${commentsList.children.length} из <span class="comments-count">${currentObject.comments.length}</span> комментариев`;
  }
};

const onLoaderClick = () => {
  loadComments(addedComments);
  commentsCounter.innerHTML = `${commentsList.children.length} из <span class="comments-count">${addedComments.length}</span> комментариев`;
  if (addedComments.length === commentsList.children.length) {
    addedComments = [];
    commentsLoader.classList.add('hidden');
  }
};

picturesContainer.addEventListener('click', onPictureListClick);


export {addPictures, onLoaderClick, commentsCounter};
