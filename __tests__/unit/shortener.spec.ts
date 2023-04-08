import Shortener from '../../lib/shortener';

jest.mock('../../db', () => {
  return {
    __esModule: true,
    default: {
      get: jest
        .fn()
        .mockResolvedValueOnce('https://rsgarxia.is-a.dev')
        .mockResolvedValueOnce({
          status: 'error',
          reason: 'URL not found',
        }),
      set: jest.fn().mockResolvedValueOnce(true),
    },
  };
});

describe('Shortener', () => {
  describe('urlByHash method', () => {
    describe('if Hash exists', () => {
      it('returns URL', async () => {
        const url = await Shortener.urlByHash('some-uuid');

        expect(url).toBe('https://rsgarxia.is-a.dev');
      });
    });

    describe('if Hash does not exist', () => {
      it('returns JSON with error message', async () => {
        const result = await Shortener.urlByHash('some-uuid');

        expect(result).toMatchObject({
          reason: expect.any(String),
          status: expect.any(String),
        });
      });
    });
  });

  describe('hashUrl method', () => {
    it('returns JSON with URL hash', async () => {
      const url = 'https://rsgarxia.is-a.dev';
      const hash = await Shortener.hashUrl(url);

      expect(hash).toMatchObject({
        status: 'success',
        original_url: url,
        shortened_url: expect.any(String),
      });
    });
  });
});
