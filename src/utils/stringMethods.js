export const isStringInteger = s => {
  return !isNaN(parseInt(s));
};

export const maxStringLength = (str, limit) => {
  return `${str.slice(0, limit)}${str.length > limit ? '...' : ''}`;
};

export const capitalFirstLetter = str => {
  if (!str) return '';
  return str[0]?.toUpperCase() + str?.slice(1);
};
