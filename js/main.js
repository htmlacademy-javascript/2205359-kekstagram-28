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

const getRandomInt = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInt(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInt(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generateUserId = createRandomIdFromRangeGenerator(MIN_ID, MAX_ID);
const generatePhotoId = createRandomIdFromRangeGenerator(MIN_ID, MAX_ID);
const generateCommentId = createRandomIdFromRangeGenerator(MIN_COMMENT_ID, MAX_COMMENT_ID);

const createComments = () => {
  const newComments = [];
  const commentsNumber = getRandomInt(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER);
  for (let i = 1; i <= commentsNumber; i++) {
    const newComment = {};
    newComment.id = generateCommentId();
    newComment.avatar = `img/avatar-${getRandomInt(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`;
    newComment.message = MESSAGES[getRandomInt(0, MESSAGES.length - 1)];
    newComment.name = NAMES[getRandomInt(0, NAMES.length - 1)];
    newComments.push(newComment);
  }
  return newComments;
};

const createDescriptions = () => {
  const photoDescriptions = [];
  for (let i = 1; i <= USERS_AMOUNT; i++) {
    const newObj = {};
    newObj.id = generateUserId();
    newObj.url = `photos/${generatePhotoId()}.jpg`;
    newObj.description = DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)];
    newObj.likes = getRandomInt(MIN_LIKES, MAX_LIKES);
    newObj.comments = createComments();
    photoDescriptions.push(newObj);
  }
  return photoDescriptions;
};

createDescriptions();
