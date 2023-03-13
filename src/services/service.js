import axios from 'axios';

let baseURL = 'https://appdev.principalityofcogito.com/api/';

export const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_LINK}user`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const get = () => {
  return new Promise((resolve, reject) => {
    axios(``)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export { get };
