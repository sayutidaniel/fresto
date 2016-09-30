import config from 'config';
import { generateAPIUrl } from '../src/helpers/service';

process.env.API_BASE_URL = config.get('API_BASE_URL');

const routes = {};
const fetch = jest.fn((url, options) =>
  new Promise((resolve) => {
    const { method } = Object.assign({ method: 'GET' }, options);
    const { body, status } = routes[method][url];
    process.nextTick(() =>
      resolve({
        status,
        body,
        json: () => Object.assign({}, body),
        text: () => JSON.stringify(body),
      })
    )
  })
);

function mockResponse(path, status, body, options) {
  const { method } = Object.assign({ method: 'GET' }, options);
  const url = generateAPIUrl(path);
  if (typeof routes[method] === 'undefined') {
    routes[method] = {};
  }
  routes[method][url] = {
    body,
    status,
  };
  return fetch;
}

function mockResponseSuccess(path, data, options) {
  return mockResponse(path, 200, data, options);
}

function mockResponseError(path, message, options) {
  return mockResponse(path, 400, message, options);
}

fetch.mockResponseSuccess = mockResponseSuccess;
fetch.mockResponseError = mockResponseError;

module.exports = fetch;
