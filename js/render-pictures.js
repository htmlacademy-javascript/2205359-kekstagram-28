import {openFullSize, renderFullSize, renderComments} from './render-fullsize.js';
import {generateDescriptions} from './data.js';


const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const generatedPictures = generateDescriptions();

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
    renderComments(currentObject);
  }
};

picturesContainer.addEventListener('click', onPictureListClick);

export {addPictures};
