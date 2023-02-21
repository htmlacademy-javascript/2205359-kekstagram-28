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
