import fetch from 'isomorphic-fetch';

const API_BASE_URL = process.env.API_BASE_URL;
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export function generateAPIUrl(path, query = '') {
  const url = `${API_BASE_URL}/${path}`;
  return `${url}${(query !== '' ? `?${query}` : '')}`;
}

export function get(path, query = '') {
  const url = generateAPIUrl(path, query);

  return fetch(url, {
    headers,
  })
    .then((res) => {
      if (res.status !== 200) return Promise.reject(res.text());
      return res.json();
    });
}
