import { parentTheme } from './parentTheme';
import { ageGroupOneTheme } from './ageGroupOneTheme';
import { ageGroupTwoTheme } from './ageGroupTwoTheme';
import { ageGroupThreeTheme } from './ageGroupThreeTheme';
import { createTheme } from '@material-ui/core';
import { commonTheme } from './commonTheme';
import { constant } from '../utils/constant';
import { getAgeFromDob } from '../utils/timeMethods';

export const globalTheme = ({ profile }) => {
  let age = getAgeFromDob(profile?.dateOfBirth);
  const globalThemeVar = createTheme({
    customTheme: {
      ...(!profile?.isMinor
        ? parentTheme
        : age <= 16 && age >= 11
        ? ageGroupOneTheme
        : age <= 10 && age >= 6
        ? ageGroupTwoTheme
        : ageGroupThreeTheme),
    },
    commonTheme: { ...commonTheme },
    typography: {
      fontFamily: constant.globalStyling.fontFamily,
    },
    button: {
      fontFamily: constant.globalStyling.fontFamily,
    },
    palette: {},
  });
  return globalThemeVar;
};
