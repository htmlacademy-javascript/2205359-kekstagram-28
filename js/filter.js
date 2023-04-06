import { shuffleArray } from './util.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;
const SHUFFLED_COUNT = 10;
const imgFilters = document.querySelector('.img-filters');

const compareCommentsLength = (first, second) => second.comments.length - first.comments.length;

const sortByComments = (data) => {
  const dataCopy = data.slice();
  return dataCopy.sort(compareCommentsLength);
};

const shufflePhotos = (data) => shuffleArray(data.slice(0, SHUFFLED_COUNT));

const setUpFilter = () => imgFilters.classList.remove('img-filters--inactive');

const changeFilters = (evt) => {
  if (evt.target.closest('.img-filters__button') && !evt.target.closest('.img-filters__button--active')) {
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  }
};

const filterPictures = (evt, data, cb) => {
  const photos = document.querySelectorAll('.picture');
  photos.forEach((el) => el.remove());
  switch(evt.target.id) {
    case 'filter-discussed':
      return cb(sortByComments(data));
    case 'filter-random':
      return cb(shufflePhotos(data));
    case 'filter-default':
      return cb(data);
  }
};

const setFilterClick = debounce((evt, data, cb) => filterPictures(evt, data, cb), RERENDER_DELAY);

const onFilterListClick = (evt, data, cb) => {
  changeFilters(evt);
  setFilterClick(evt, data, cb);
};

const addFilterListeners = (data, cb) => {
  setUpFilter();
  imgFilters.addEventListener('click', (evt) => {
    onFilterListClick(evt, data, cb);
  });
};

export {addFilterListeners};
