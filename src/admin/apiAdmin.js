import { URL } from '../config';

export const createCategory = (userId, token, name) => {
  return fetch(`${URL}/category/create/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
    },
    body: JSON.stringify(name),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {});
};
