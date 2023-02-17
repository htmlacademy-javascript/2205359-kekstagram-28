// Функция для проверки длины строки.
const checkStringLength = (str, max) => str.length <= max;

checkStringLength('привет', 2);

// Функция для проверки, является ли строка палиндромом.

const isPalindrome = (str) => {
  const noGapString = str.replaceAll(' ', '').toLowerCase();
  const reverseString = noGapString.split('').reverse().join('');
  return noGapString === reverseString;
};

isPalindrome('А роза упала на лапу Азора');

/*  Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
    и возвращает их в виде целого положительного числа.
*/

const extractDigits = (str) => {
  const digitRegExp = /\d/g;
  const stringDigits = str.toString().match(digitRegExp);
  return stringDigits ? Number(stringDigits.join('')) : NaN;
};

extractDigits('1 кефир, 0.5 батона');

/*  Функция, которая принимает три параметра: исходную строку, минимальную длину
    и строку с добавочными символами — и возвращает исходную строку, дополненную
    указанными символами до заданной длины. Символы добавляются в начало строки.
    Если исходная строка превышает заданную длину, она не должна обрезаться.
    Если «добивка» слишком длинная, она обрезается с конца.
*/

const overflowTrim = (str, char, min) => {
  const overflow = (str.length + char.length) - min;
  const trimmedChar = char.slice(0, (char.length - overflow));
  return trimmedChar;
};

const padString = (str, min, additionalChar) => {
  if (str.length >= min) {
    return str;
  }
  if (str.length + additionalChar.length > min) {
    const trimmedChar = overflowTrim(str, additionalChar, min);
    return `${trimmedChar}${str}`;
  }
  if (str.length + additionalChar.length < min) {
    const lack = min - (str.length + additionalChar.length);
    if (lack === 1) {
      return `${additionalChar[0]}${additionalChar}${str}`;
    }
    let charRepeat = additionalChar.repeat(lack + 1);
    if (str.length + charRepeat.length > min) {
      charRepeat = overflowTrim(str, charRepeat, min);
    }
    return `${charRepeat}${str}`;
  }
  return `${additionalChar}${str}`;
};

padString('string', 40, 'wow');
