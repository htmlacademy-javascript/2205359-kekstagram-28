import {generateDescriptions} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const generatedPictures = generateDescriptions();

const addPictures = () => {
  generatedPictures.forEach(({url, likes, comments}) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = url;
    newPicture.querySelector('.picture__likes').textContent = likes;
    newPicture.querySelector('.picture__comments').textContent = comments.length;
    fragment.append(newPicture);
  });
  picturesContainer.append(fragment);
};

export {addPictures};
