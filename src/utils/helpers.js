import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStorage = async (key, value) => {
  try {
    // console.log('stored auth');
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // console.log('stored auth error ');
    return e;
    // saving error
  }
};
export const setAsyncStorageWithExpiry = async (key, value) => {
  try {
    // console.log('stored auth');
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + 2592000000,
      // 2592000000  is 30 days
      // 2332800000 is 27 days
      // expiry: now.getTime() + ttl * 900000,
      // 30000 is 30 seconds
    };
    console.log('key', key, 'value', value);
    await AsyncStorage.setItem(key, JSON.stringify(item));
    // console.log('got?', await AsyncStorage.getItem(key))
  } catch (e) {
    // saving error
    return e;
  }
};

export const getAsyncStorageWithoutExpiry = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // console.log('get stored auth');
      return value;
    }
  } catch (e) {
    return e;
  }
};

export const getAsyncStorage = async key => {
  const itemStr = await AsyncStorage.getItem(key);
  // console.log('getAsynStorage called', key, itemStr)
  // console.log({ itemStr })
  if (!itemStr) {
    // console.log('nothing')
    return null;
  }

  let item;
  try {
    item = JSON.parse(itemStr);
    // if (value !== null) {
    //  console.log('get stored auth');
    //   return value;
    // }
  } catch (e) {
    // console.log('JSON.parseError', e)
    // return e;
  }
  const now = new Date();
  if (key === AsyncStorageKeys.AUTH_TOKEN && now.getTime() > item?.expiry) {
    // console.log('removed a token')
    await AsyncStorage.removeItem(key);
    return null;
  }
  // console.log({ item })
  return item.value;
};

export function deleteAsyncStorage(key) {
  AsyncStorage.removeItem(key, err => {
    if (err) {
      return err;
    } else {
      return 'done';
    }
  });
}

export function clearStore(next) {
  AsyncStorage.clear(err => {
    if (err) {
      return next(err);
    } else {
      return next(null, 'done');
    }
  });
}

export const removeValue = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('error');
    // remove error
  }

  console.log('Done.');
};

export const AsyncStorageKeys = {
  OTP_TOKEN: 'OTP_TOKEN',
  AUTH_TOKEN: 'AUTH_TOKEN',
  USER_DETAILS: 'USER_DETAILS',
  FIRST_LOGIN: 'FIRST_LOGIN',
  USER_NAME: 'USER_NAME',
};

export const DateFormatter = date => {
  const dateObj = new Date(date);
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthName = monthNames[month];
  const outputDate = `${monthName} ${day}, ${year}`;
  return outputDate;
};

export const calculateAge = dateOfBirth => {
  var today = new Date();
  var birthDate = new Date(dateOfBirth);
  var age = today.getFullYear() - birthDate.getFullYear();
  var monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};
