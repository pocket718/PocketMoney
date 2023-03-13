export const getAgeGroup = age => {
  let categoryValue = '';
  if (age >= 0 && age <= 5) {
    categoryValue = 1;
  } else if (age >= 6 && age <= 10) {
    categoryValue = 2;
  } else if (age >= 11 && age <= 16) {
    categoryValue = 3;
  }

  return categoryValue;
};
