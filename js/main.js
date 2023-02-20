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

const generateUserId = createRandomIdFromRangeGenerator(1, 25);
const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = createRandomIdFromRangeGenerator(40, 200);

const createComments = () => {
  const newComments = [];
  const commentsNumber = getRandomInt(6, 15);
  for (let i = 1; i <= commentsNumber; i++) {
    const newComment = {};
    newComment.id = generateCommentId();
    newComment.avatar = `img/avatar-${getRandomInt(1, 6)}.svg`;
    newComment.message = MESSAGES[getRandomInt(0, MESSAGES.length - 1)];
    newComment.name = NAMES[getRandomInt(0, NAMES.length - 1)];
    newComments.push(newComment);
  }
  return newComments;
};

const createDescriptions = () => {
  const photoDescriptions = [];
  for (let i = 1; i <= 25; i++) {
    const newObj = {};
    newObj.id = generateUserId();
    newObj.url = `photos/${generatePhotoId()}.jpg`;
    newObj.description = DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)];
    newObj.likes = getRandomInt(1, 200);
    newObj.comments = createComments();
    photoDescriptions.push(newObj);
  }
  return photoDescriptions;
};

createDescriptions();
