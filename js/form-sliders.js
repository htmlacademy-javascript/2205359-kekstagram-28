import {imgUploadPrewiev} from './form.js';

const Filter = {
  CHROME: {
    filter: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    dimension: '',
  },
  SEPIA:  {
    filter: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    dimension: '',
  },
  MARVIN:  {
    filter: 'invert',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    dimension: '%',
  },
  PHOBOS: {
    filter: 'blur',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    dimension: 'px',
  },
  HEAT: {
    filter: 'brightness',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    dimension: '',
  }
};

const sliderFieldset = document.querySelector('.img-upload__effect-level');
const sliderValue = sliderFieldset.querySelector('.effect-level__value');
const slider = sliderFieldset.querySelector('.effect-level__slider');

const createSlider = () => {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    connect: 'lower',
  });
};

const destroySlider = () => {
  slider.noUiSlider.destroy();
};

const updateSlider = (effect) => {
  slider.noUiSlider.updateOptions({
    range: {
      min: Filter[effect].range.min,
      max: Filter[effect].range.max,
    },
    start: Filter[effect].start,
    step: Filter[effect].step,
  });
};

const getSliderValue = (effect) => {
  if (effect === 'none') {
    slider.noUiSlider.off();
    sliderFieldset.classList.add('hidden');
  } else {
    updateSlider(effect.toUpperCase());
    slider.noUiSlider.on('update', () => {
      sliderValue.value = slider.noUiSlider.get();
      imgUploadPrewiev.style.filter = `${Filter[effect.toUpperCase()].filter}(${slider.noUiSlider.get()}${Filter[effect.toUpperCase()].dimension})`;
      sliderFieldset.classList.remove('hidden');
    });
  }
};

const onEffectsListClick = (evt) => {
  if (evt.target.closest('.effects__radio')) {
    imgUploadPrewiev.removeAttribute('class');
    imgUploadPrewiev.style = '';
    imgUploadPrewiev.classList.add(`effects__preview--${evt.target.value}`);
    getSliderValue(evt.target.value);
  }
};

export {createSlider, sliderFieldset, onEffectsListClick, destroySlider};
