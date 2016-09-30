import config from 'config';
import { generateAPIUrl } from '../../src/helpers/service';

const API_BASE_URL = config.get('API_BASE_URL');

describe('service helper', () => {
  it('should generate an api url without query string', () => {
    expect(
      generateAPIUrl('restaurant/1')
    )
      .toBe(`${API_BASE_URL}/restaurant/1`);
  });

  it('should generate an api url with query string', () => {
    expect(
      generateAPIUrl('restaurant/1', 'sort=1')
    )
      .toBe(`${API_BASE_URL}/restaurant/1?sort=1`);
  });
});
