const checkStringLength = (str, max) => str.length <= max;

checkStringLength('привет', 2);

const isPalindrome = (str) => {
  const noGapString = str.replaceAll(' ', '').toLowerCase();
  const reverseString = noGapString.split('').reverse().join('');
  return noGapString === reverseString;
};

isPalindrome('А роза упала на лапу Азора');

const extractDigits = (str) => {
  const digitRegExp = /\d/g;
  const stringDigits = str.toString().match(digitRegExp);
  return stringDigits ? Number(stringDigits.join('')) : NaN;
};

extractDigits('1 кефир, 0.5 батона');

const padString = (str, min, char) => {
  while (str.length < min) {
    if (str.length + char.length > min) {
      char = char.slice(0, min - str.length);
    }
    str = `${char}${str}`;
  }
  return str;
};

padString('q', 4, 'we');
