const checkStringLength = (str, max) => str.length <= max;

const extractDigits = (str) => {
  const digitRegExp = /\d/g;
  const stringDigits = str.toString().match(digitRegExp);
  return stringDigits ? Number(stringDigits.join('')) : NaN;
};

export {checkStringLength, extractDigits};
