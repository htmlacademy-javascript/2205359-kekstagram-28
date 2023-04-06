import { shuffleArray } from './util.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;
const SHUFFLED_COUNT = 10;
const imgFilters = document.querySelector('.img-filters');

const compareCommentsLength = (first, second) => second.comments.length - first.comments.length;

const shufflePhotos = (data) => shuffleArray(data);

const setUpFilter = () => imgFilters.classList.remove('img-filters--inactive');

const onFiltersListClick = (evt) => {
  if (evt.target.closest('.img-filters__button') && !evt.target.closest('.img-filters__button--active')) {
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  }
};

const filterPictures = (evt, data, cb) => {
  const photos = document.querySelectorAll('.picture');
  photos.forEach((el) => el.remove());
  let dataCopy = data.slice();
  if(evt.target.id === 'filter-discussed') {
    dataCopy.sort(compareCommentsLength);
  }
  if (evt.target.id === 'filter-random') {
    dataCopy = shufflePhotos(dataCopy.slice(0, SHUFFLED_COUNT));
  }
  cb(dataCopy);
};

const setFilterClick = debounce((evt, data, cb) => filterPictures(evt, data, cb), RERENDER_DELAY);

const filter = (evt, data, cb) => {
  onFiltersListClick(evt);
  setFilterClick(evt, data, cb);
};

const addFilterListeners = (data, cb) => {
  setUpFilter();
  imgFilters.addEventListener('click', (evt) => {
    filter(evt, data, cb);
  });
};

export {addFilterListeners};
