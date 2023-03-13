// export const getWithExpiry = key => {
//     const itemStr = localStorage.getItem(key);

//     // if the item doesn't exist, return null
//     if (!itemStr) {
//       return null;
//     }

//     let item;
//     try {
//       item = JSON.parse(itemStr);
//     } catch (err) {
//       console.log('JSON.parse Error: ', err);
//     }
//     const now = new Date();

//     // compare the expiry time of the item with the current time
//     if (now.getTime() > item?.expiry) {
//       // If the item is expired, delete the item from storage
//       // and return null
//       localStorage.removeItem(key);
//       return null;
//     }
//     return item?.value;
//   };

//   export const setWithExpiry = (key, value, ttl) => {
//     const now = new Date();
//     // `item` is an object which contains the original value
//     // as well as the time when it's supposed to expire
//     const item = {
//       value: value,
//       expiry: now.getTime() + ttl * 900000,
//     };
//     // 900000 = 15 min
//     localStorage.setItem(key, JSON.stringify(item));
//   };

export const updateObject = (oldObject, updateObject) => {
  return {
    ...oldObject,
    ...updateObject,
  };
};

//   export const setLocalData = (key, value) => {
//     localStorage.setItem(key, JSON.stringify(value));
//   };

//   export const getLocalData = key => {
//     return localStorage.getItem(key);
//   };

//   export const deleteLocalData = key => {
//     localStorage.removeItem(key);
//   };

export const getFilteredData = (array, fieldName, val) => {
  let filteredArray = array?.filter((item, key) => {
    if (item[fieldName] === val) {
      console.log(item[fieldName], val, item[fieldName] === val);
      return item;
    }
  });
  return filteredArray;
};
