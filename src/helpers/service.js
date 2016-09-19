import fetch from 'isomorphic-fetch';

const API_VERSION = 'v1';
const API_ENDPOINT = `http://localhost:3000/api/${API_VERSION}`;
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export function get(path, query = '') {
  const url = `${API_ENDPOINT}/${path}`;

  return fetch(`${url}${(query !== '' ? `?${query}` : '')}`, {
    headers,
  })
    .then((res) => {
      if (res.status !== 200) return Promise.reject();
      return res.json();
    });
}
