import { URL } from '../config';

export const createCategory = (userId, token, name) => {
  console.log(URL);
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
    .catch((err) => {
      console.log(err);
    });
};
