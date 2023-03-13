import axios from 'axios';
import { getWithExpiry } from './utility';
import { AsyncStorageKeys, getAsyncStorage } from './helpers';
//import fetch from 'isomorphic-fetch';

let API_URL = "https://appdev.principalityofcogito.com/api/";

export default async function callApi(
  endpoint,
  method = 'get',
  body,
  contentType = 'application/json',
  isErrorSuppressed = false,
  tokenKey = 'token',
) {
  let token = (await getAsyncStorage(AsyncStorageKeys.AUTH_TOKEN)) || '';

  //let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlSWQiOiI2MTBkNGRjMTY2MjhmZjQzMTBjNGQ1MjEiLCJ1c2VyTmFtZSI6ImZpZXVybzEiLCJpYXQiOjE2NzcxNTM3NTMsImV4cCI6MTY3NzE1NTU1M30.Sin7pAbOouuMA8FZ12JmilWyrsGrW8mBt545--zmOFQ"

  let headers = {};
  headers['content-type'] = contentType;
  if (token && token !== '') {
    headers.token = `${token}`;
  }
  return fetch(`${API_URL}${'user'}/${endpoint}`, {
    headers: headers,
    method,
    body: JSON.stringify(body),
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      return err;
    });
}
export async function callApiPocketmoney(
  endpoint,
  method = 'get',
  body,
  contentType = 'application/json',
  isErrorSuppressed = false,
) {
  let reqToken = (await getAsyncStorage(AsyncStorageKeys.AUTH_TOKEN)) || '';


  let headers = {};
  headers['content-type'] = contentType;
  if (reqToken && reqToken !== '') {
    // console.log('inn')
    headers.token = `${reqToken}`;
  } 
  return fetch(`${API_URL}${'pocketMoney'}/${endpoint}`, {
    headers: headers,
    method,
    body: JSON.stringify(body),
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      return err;
    });
}
// not using
export async function callApi_multipart(
  endpoint,
  method = 'get',
  body,
  isErrorSuppressed = false,
) {
    let token = (await getAsyncStorage(AsyncStorageKeys.AUTH_TOKEN)) || '';

  let headers = {};
  headers['content-type'] = 'multipart/form-data';
  if (token && token !== '') {
    headers.token = `${token}`;
  }
  return fetch(`${API_URL}user/${endpoint}`, {
    headers: headers,
    method,
    body: body,
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      return err;
    });
}

//without authcheck
export const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_LINK}user`,
  headers: {
    'Content-Type': 'application/json',
  },
});
