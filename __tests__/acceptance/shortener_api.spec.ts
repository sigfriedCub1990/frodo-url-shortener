import request from 'supertest';
import app from '../../app';

jest.mock('../../lib/shortener', () => ({
  urlByHash: jest.fn().mockResolvedValue('some-hash'),
  hashUrl: jest.fn((url) =>
    Promise.resolve({
      status: 'success',
      original_url: url,
      shortened_url: 'https://frodo.sigfried.xyz/some-hash',
    }),
  ),
}));

describe('POST /shorten', () => {
  afterAll(() => jest.restoreAllMocks());

  describe('on valid URL', () => {
    it('should return correct JSON', async () => {
      const response = await request(app)
        .post('/api/v1/shorten')
        .send({ url: 'https://rsgarxia.is-a.dev' });

      expect(response.body).toEqual({
        status: 'success',
        original_url: 'https://rsgarxia.is-a.dev',
        shortened_url: 'https://frodo.sigfried.xyz/some-hash',
      });
    });

    it('should return 200 (O.K)', async () => {
      const response = await request(app)
        .post('/api/v1/shorten')
        .send({ url: 'https://rsgarxia.is-a.dev' });

      expect(response.status).toBe(200);
    });
  });

  describe('on invalid URL', () => {
    it('should return JSON with error message', async () => {
      const response = await request(app)
        .post('/api/v1/shorten')
        .send({ url: 'not-a-url' });

      expect(response.body).toEqual({
        status: 'error',
        message: '"url" must be a valid uri',
      });
    });

    it('should return 422 (Unprocessable Entity)', async () => {
      const response = await request(app)
        .post('/api/v1/shorten')
        .send({ url: 'not-a-url' });

      expect(response.status).toBe(422);
    });
  });
});
