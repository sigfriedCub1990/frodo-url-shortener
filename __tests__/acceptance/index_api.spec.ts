import app from '../../app';
import request from 'supertest';

jest.mock('../../lib/shortener', () => ({
  urlByHash: jest
    .fn()
    .mockResolvedValueOnce('https://rsgarxia.is-a.dev')
    .mockResolvedValueOnce({
      status: 'error',
      reason: 'URL not found',
    }),
}));

describe('GET /', () => {
  afterAll(() => jest.restoreAllMocks());

  describe('there is a URL stored', () => {
    it('returns 301 (Moved Permanently)', async () => {
      const response = await request(app).get('/some-hash');
      expect(response.status).toBe(301);
    });
  });

  describe('there is not a URL stored', () => {
    it('returns JSON with error message', async () => {
      const response = await request(app).get('/some-hash');

      expect(response.body).toMatchObject({
        status: 'error',
        reason: 'URL not found',
      });
    });
    it('returns 404 (Not Found)', async () => {
      const response = await request(app).get('/some-hash');

      expect(response.status).toBe(404);
    });
  });
});
