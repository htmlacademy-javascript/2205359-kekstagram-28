import {imgUploadPrewiev} from './form.js';

const EFFECTS_MAP = {
  chrome: {
    filter: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    dimension: '',
  },
  sepia:  {
    filter: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    dimension: '',
  },
  marvin:  {
    filter: 'invert',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    dimension: '%',
  },
  phobos: {
    filter: 'blur',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    dimension: 'px',
  },
  heat: {
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
      min: EFFECTS_MAP[effect].range.min,
      max: EFFECTS_MAP[effect].range.max,
    },
    start: EFFECTS_MAP[effect].start,
    step: EFFECTS_MAP[effect].step,
  });
};

const getSliderValue = (effect) => {
  if (effect === 'none') {
    slider.noUiSlider.off();
    sliderFieldset.classList.add('hidden');
  } else {
    updateSlider(effect);
    slider.noUiSlider.on('update', () => {
      sliderValue.value = slider.noUiSlider.get();
      imgUploadPrewiev.style.filter = `${EFFECTS_MAP[effect].filter}(${slider.noUiSlider.get()}${EFFECTS_MAP[effect].dimension})`;
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
