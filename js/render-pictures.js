import {openFullSize, renderFullSize, renderComments} from './render-fullsize.js';
import {generateDescriptions} from './data.js';


const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const generatedPictures = generateDescriptions();

// отображение миниатюр на странице
const addPictures = (userData) => {
// цикл: пройтись по всем сгенерированным объектам с данными о фото
  userData.forEach((obj) => {
    //генерация фото-превью
    const newPicture = pictureTemplate.cloneNode(true); //
    newPicture.querySelector('.picture__img').src = obj.url;
    newPicture.querySelector('.picture__likes').textContent = obj.likes;
    newPicture.querySelector('.picture__comments').textContent = obj.comments.length;
    // обработчик клика для открытия полноразмерного фото
    const renderPhotoDetails = () => {
      renderFullSize(obj);
      renderComments(obj);
    };
    newPicture.addEventListener('click', renderPhotoDetails);
    fragment.append(newPicture);
  });
  picturesContainer.append(fragment);
  picturesContainer.addEventListener('click', openFullSize);
};

export {addPictures, generatedPictures};
