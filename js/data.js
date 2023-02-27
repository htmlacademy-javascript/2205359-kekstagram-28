import {getRandomInt, createRandomIdFromRangeGenerator, getRandomArrayElement} from './data-util.js';

const USERS_AMOUNT = 25;
const MIN_ID = 1;
const MAX_ID = 25;
const MIN_COMMENT_ID = 40;
const MAX_COMMENT_ID = 200;
const MIN_COMMENTS_NUMBER = 5;
const MAX_COMMENTS_NUMBER = 15;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const MIN_LIKES = 1;
const MAX_LIKES = 200;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артём',
  'Анна',
  'Михаил',
  'Ясос Биба',
  'Денис',
  'Татьяна',
  'Изабелла',
  'Даниил',
];

const DESCRIPTIONS = [
  'Любимая фотография',
  'Сфоткал, пока шёл на работу',
  'Продолжаю играться с фильтрами',
  'Эстетика моего дня',
  'Снято на мой новенький Iphone 14 pro max)',
  'Гениальность в простате (с) Джейсон Стетхем',
  'Отдыхаю на Бали',
  'Коротко о том, как прошел мой день',
];

const generateUserId = createRandomIdFromRangeGenerator(MIN_ID, MAX_ID);
const generatePhotoId = createRandomIdFromRangeGenerator(MIN_ID, MAX_ID);
const generateCommentId = createRandomIdFromRangeGenerator(MIN_COMMENT_ID, MAX_COMMENT_ID);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInt(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name:  getRandomArrayElement(NAMES)
});

const generateComments = () => Array.from({length: getRandomInt(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER)}, createComment);

const createDescriptions = () => ({
  id: generateUserId(),
  url: `photos/${generatePhotoId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInt(MIN_LIKES, MAX_LIKES),
  comments: generateComments(),
});

const generateDescriptions = () => Array.from({length: USERS_AMOUNT}, createDescriptions);


export {generateDescriptions};
